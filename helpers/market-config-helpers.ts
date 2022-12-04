import {utils} from 'ethers/lib';
import {
  AssetType,
  eEthereumNetwork,
  IAaveConfiguration,
  ICommonConfiguration,
  ITokenAddress,
  tEthereumAddress,
} from './types';

import * as hre from 'hardhat';
import aave from '../markets/aave';
import {isValidAddress} from './utilities/utils';
import * as bluebird from 'bluebird';

import {
  ATOKEN_PREFIX,
  VARIABLE_DEBT_PREFIX,
  STABLE_DEBT_PREFIX,
  TESTNET_TOKEN_PREFIX,
  TESTNET_REWARD_TOKEN_PREFIX,
  TESTNET_PRICE_AGGR_PREFIX,
  TREASURY_PROXY_ID,
} from './deploy-ids';

import {ZERO_ADDRESS} from './constants';
import {ENABLE_REWARDS} from './env';
import {iParamsPerNetwork, eNetwork} from './types';
import {IBaseConfiguration, SubTokenOutput} from '@mahalend/deploy-v3';

export enum ConfigNames {
  Commons = 'Commons',
  Aave = 'Aave',
  Matic = 'Matic',
  Amm = 'Amm',
  Avalanche = 'Avalanche',
  Test = 'Test',
  Harmony = 'Harmony',
}

export const getParamPerNetwork = <T>(
  param: iParamsPerNetwork<T> | undefined | string,
  network: eNetwork
): T | undefined => {
  if (!param) return undefined;
  return param[network];
};

export const getRequiredParamPerNetwork = <T>(
  poolConfig: IBaseConfiguration,
  key: keyof ICommonConfiguration,
  network: eNetwork
): T => {
  const mapNetworkToValue = poolConfig[key];
  if (!mapNetworkToValue) throw `[config] missing required parameter ${key} at market config`;
  const value = mapNetworkToValue[network];
  if (!value) throw `[config] missing required value at ${key}.${network}`;
  return value;
};

export const getAddressFromConfig = (
  param: iParamsPerNetwork<string | undefined>,
  network: eNetwork,
  key: string
) => {
  const value = exports.getParamPerNetwork(param, network);
  if (!value || !isValidAddress(value)) {
    throw Error(
      `[aave-v3-deploy] Input parameter ${key ? `"${key}"` : ''} is missing or is not an address.`
    );
  }
  return value;
};

export const loadPoolConfig = (configName: ConfigNames): ICommonConfiguration => {
  switch (configName) {
    case ConfigNames.Aave:
      return aave;
    default:
      throw new Error(
        `Unsupported pool configuration: ${configName} is not one of the supported configs ${Object.values(
          ConfigNames
        )}`
      );
  }
};

export const checkRequiredEnvironment = (): boolean => {
  if (!process.env.MARKET_NAME) {
    console.error(`Skipping Market deployment due missing "MARKET_NAME" environment variable.`);
    return true;
  }
  return false;
};

export const savePoolTokens = async (
  reservesConfig: ITokenAddress,
  dataProviderAddress: tEthereumAddress
): Promise<string[]> => {
  const dataProviderArtifact = await hre.deployments.get(_1.POOL_DATA_PROVIDER);
  const dataProvider = await hre.ethers.getContractAt(
    dataProviderArtifact.abi,
    dataProviderAddress
  );
  const aTokenArtifact = await hre.deployments.getExtendedArtifact('AToken');
  const variableDebtTokenArtifact = await hre.deployments.getExtendedArtifact('VariableDebtToken');
  const stableDebtTokenArtifact = await hre.deployments.getExtendedArtifact('StableDebtToken');
  return bluebird.each(Object.keys(reservesConfig), async (tokenSymbol) => {
    const {aTokenAddress, variableDebtTokenAddress, stableDebtTokenAddress} =
      await dataProvider.getReserveTokensAddresses(reservesConfig[tokenSymbol]);
    await hre.deployments.save(`${tokenSymbol}${ATOKEN_PREFIX}`, {
      address: aTokenAddress,
      ...aTokenArtifact,
    });
    await hre.deployments.save(`${tokenSymbol}${VARIABLE_DEBT_PREFIX}`, {
      address: variableDebtTokenAddress,
      ...variableDebtTokenArtifact,
    });
    await hre.deployments.save(`${tokenSymbol}${STABLE_DEBT_PREFIX}`, {
      address: stableDebtTokenAddress,
      ...stableDebtTokenArtifact,
    });
  });
};

export const getReserveAddresses = async (
  poolConfig: IBaseConfiguration,
  network: eNetwork
): Promise<ITokenAddress> => {
  const isLive = hre.config.networks[network].live;
  if (isLive && !poolConfig.TestnetMarket) {
    console.log('[NOTICE] Using ReserveAssets from configuration file');
    return getRequiredParamPerNetwork(poolConfig, 'ReserveAssets', network);
  }
  console.log(
    '[WARNING] Using deployed Testnet tokens instead of ReserveAssets from configuration file'
  );
  const reservesKeys = Object.keys(poolConfig.ReservesConfig);
  const allDeployments = await hre.deployments.all();
  const testnetTokenKeys = Object.keys(allDeployments).filter(
    (key) =>
      key.includes(TESTNET_TOKEN_PREFIX) &&
      reservesKeys.includes(key.replace(TESTNET_TOKEN_PREFIX, ''))
  );
  return testnetTokenKeys.reduce((acc, key) => {
    const symbol = key.replace(TESTNET_TOKEN_PREFIX, '');
    acc[symbol] = allDeployments[key].address;
    return acc;
  }, {});
};

export const getSubTokensByPrefix = async (prefix: string): Promise<SubTokenOutput[]> => {
  const allDeployments = await hre.deployments.all();
  const tokenKeys = Object.keys(allDeployments).filter((key) => key.includes(prefix));
  if (!tokenKeys.length) {
    return [];
  }

  return tokenKeys.reduce((acc: Array<any>, key) => {
    acc.push({
      symbol: key.replace(prefix, ''),
      artifact: allDeployments[key],
    });
    return acc;
  }, []);
};

export const getSymbolsByPrefix = async (prefix: string): Promise<string[]> => {
  const allDeployments = await hre.deployments.all();
  const tokenKeys = Object.keys(allDeployments).filter((key) => key.includes(prefix));
  if (!tokenKeys.length) {
    return [];
  }
  return tokenKeys.reduce((acc: Array<any>, key) => {
    acc.push(key.replace(prefix, ''));
    return acc;
  }, []);
};

export const getChainlinkOracles = async (
  poolConfig: IBaseConfiguration,
  network: eNetwork
): Promise<ITokenAddress> => {
  const isLive = hre.config.networks[network].live;
  if (isLive) {
    console.log('[NOTICE] Using ChainlinkAggregator from configuration file');
    return getRequiredParamPerNetwork(poolConfig, 'ChainlinkAggregator', network);
  }
  console.log(
    '[WARNING] Using deployed Mock Price Aggregators instead of ChainlinkAggregator from configuration file'
  );
  let rewardKeys: string[] = [];
  if (isIncentivesEnabled(poolConfig)) {
    rewardKeys = await getSymbolsByPrefix(TESTNET_REWARD_TOKEN_PREFIX);
  }
  const reservesKeys = Object.keys(poolConfig.ReservesConfig);
  const allDeployments = await hre.deployments.all();
  const testnetKeys = Object.keys(allDeployments).filter(
    (key) =>
      key.includes(TESTNET_PRICE_AGGR_PREFIX) &&
      (reservesKeys.includes(key.replace(TESTNET_PRICE_AGGR_PREFIX, '')) ||
        rewardKeys.includes(key.replace(TESTNET_PRICE_AGGR_PREFIX, '')))
  );
  return testnetKeys.reduce((acc, key) => {
    const symbol = key.replace(TESTNET_PRICE_AGGR_PREFIX, '');
    acc[symbol] = allDeployments[key].address;
    return acc;
  }, {});
};

export const getTreasuryAddress = async (
  poolConfig: ICommonConfiguration,
  network: eNetwork
): Promise<tEthereumAddress> => {
  const treasuryConfigAddress = getParamPerNetwork(
    poolConfig.ReserveFactorTreasuryAddress,
    network
  );
  if (
    treasuryConfigAddress &&
    utils.getAddress(treasuryConfigAddress) !== utils.getAddress(ZERO_ADDRESS)
  ) {
    return treasuryConfigAddress;
  }
  console.log(
    '[WARNING] Using latest deployed Treasury proxy instead of ReserveFactorTreasuryAddress from configuration file'
  );
  const deployedTreasury = await hre.deployments.get(TREASURY_PROXY_ID);
  return deployedTreasury.address;
};

export const isProductionMarket = (poolConfig: IBaseConfiguration): boolean => {
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  return hre.config.networks[network]?.live && !poolConfig.TestnetMarket;
};

export const isTestnetMarket = (poolConfig: IBaseConfiguration): boolean =>
  !isProductionMarket(poolConfig);

export const getReserveAddress = async (
  poolConfig: IBaseConfiguration,
  symbol: string
): Promise<string> => {
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  let assetAddress = poolConfig.ReserveAssets?.[network]?.[symbol];
  const isZeroOrNull = !assetAddress || assetAddress === ZERO_ADDRESS;
  if (isZeroOrNull && isTestnetMarket(poolConfig)) {
    return await (0, _1.getTestnetReserveAddressFromSymbol)(symbol);
  }
  if (!assetAddress || isZeroOrNull) {
    throw `Missing asset address for asset ${symbol}`;
  }
  return assetAddress;
};

export const getOracleByAsset = async (
  poolConfig: IBaseConfiguration,
  symbol: string
): Promise<string> => {
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  if (isTestnetMarket(poolConfig)) {
    return (await hre.deployments.get(`${symbol}${TESTNET_PRICE_AGGR_PREFIX}`)).address;
  }
  const oracleAddress = poolConfig.ChainlinkAggregator[network]?.[symbol];
  if (!oracleAddress) {
    throw `Missing oracle address for ${symbol}`;
  }
  return oracleAddress;
};

export const isL2PoolSupported = (poolConfig: ICommonConfiguration): boolean => {
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  return !!getParamPerNetwork(poolConfig.L2PoolEnabled, eEthereumNetwork[network]);
};

export const getPrefixByAssetType = (assetType: AssetType): string => {
  switch (assetType) {
    case AssetType.AToken:
      return ATOKEN_PREFIX;
    case AssetType.VariableDebtToken:
      return VARIABLE_DEBT_PREFIX;
    case AssetType.StableDebtToken:
      return STABLE_DEBT_PREFIX;
  }
};

export const isIncentivesEnabled = (poolConfig: ICommonConfiguration): boolean => {
  const network = process.env.FORK ? process.env.FORK : hre.network.name;
  if (ENABLE_REWARDS !== undefined) {
    return !!ENABLE_REWARDS;
  }

  return !!getParamPerNetwork(
    poolConfig.IncentivesConfig?.enabled || undefined,
    eEthereumNetwork[network]
  );
};
