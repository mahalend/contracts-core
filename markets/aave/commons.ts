import {ZERO_ADDRESS} from '../../helpers/constants';
import {ICommonConfiguration, eEthereumNetwork} from '../../helpers/types';

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons Aave Market',
  ATokenNamePrefix: 'Ethereum',
  StableDebtTokenNamePrefix: 'Ethereum',
  VariableDebtTokenNamePrefix: 'Ethereum',
  SymbolPrefix: 'Eth',
  ProviderId: 8080,
  OracleQuoteCurrencyAddress: ZERO_ADDRESS,
  OracleQuoteCurrency: 'USD',
  OracleQuoteUnit: '8',
  WrappedNativeTokenSymbol: 'WETH',
  ChainlinkAggregator: {
    [eEthereumNetwork.main]: {
      AAVE: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',
      DAI: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
      LINK: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
      USDC: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
      WBTC: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
      WETH: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      USDT: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
      // Note: EUR/USD, not EURS dedicated oracle
      EURS: '0xb49f677943BC038e9857d61E7d053CaA2C1734C1',
    },
    [eEthereumNetwork.goerli]: {
      AAVE: ZERO_ADDRESS,
      DAI: ZERO_ADDRESS,
      LINK: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      EURS: ZERO_ADDRESS,
    },
    [eEthereumNetwork.polygon]: {
      AAVE: ZERO_ADDRESS,
      DAI: ZERO_ADDRESS,
      LINK: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      EURS: ZERO_ADDRESS,
    },
    [eEthereumNetwork.coverage]: {
      AAVE: ZERO_ADDRESS,
      DAI: ZERO_ADDRESS,
      LINK: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      EURS: ZERO_ADDRESS,
    },
    [eEthereumNetwork.hardhat]: {
      AAVE: ZERO_ADDRESS,
      DAI: ZERO_ADDRESS,
      LINK: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
      EURS: ZERO_ADDRESS,
    },
  },
  ReserveFactorTreasuryAddress: {
    [eEthereumNetwork.goerli]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.main]: '0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c',
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
  },
  FallbackOracle: {
    [eEthereumNetwork.goerli]: '0x50913E8E1c650E790F8a1E741FF9B1B1bB251dfe',
    [eEthereumNetwork.main]: '0x5b09e578cfeaa23f1b11127a658855434e4f3e09',
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
  },
  ReservesConfig: {},
  IncentivesConfig: {
    enabled: {
      [eEthereumNetwork.goerli]: false,
      [eEthereumNetwork.polygon]: false,
      [eEthereumNetwork.main]: false,
      [eEthereumNetwork.hardhat]: false,
      [eEthereumNetwork.coverage]: false,
    },
    rewards: {
      [eEthereumNetwork.goerli]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.polygon]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.main]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.hardhat]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.coverage]: {
        StkAave: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {
      [eEthereumNetwork.goerli]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.polygon]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.main]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.hardhat]: {
        StkAave: ZERO_ADDRESS,
      },
      [eEthereumNetwork.coverage]: {
        StkAave: ZERO_ADDRESS,
      },
    },
    incentivesInput: {
      [eEthereumNetwork.goerli]: [],
      [eEthereumNetwork.polygon]: [],
      [eEthereumNetwork.main]: [],
      [eEthereumNetwork.hardhat]: [],
      [eEthereumNetwork.coverage]: [],
    },
  },
  EModes: {
    StableEMode: {
      id: '1',
      ltv: '9700',
      liquidationThreshold: '9750',
      liquidationBonus: '10100',
      label: 'Stablecoins',
      assets: ['USDC', 'USDT', 'DAI', 'EURS'],
    },
  },
  L2PoolEnabled: {
    [eEthereumNetwork.goerli]: false,
    [eEthereumNetwork.polygon]: false,
    [eEthereumNetwork.main]: false,
    [eEthereumNetwork.hardhat]: false,
    [eEthereumNetwork.coverage]: false,
  },
  ParaswapRegistry: {
    [eEthereumNetwork.main]: '0xa68bEA62Dc4034A689AA0F58A76681433caCa663',
    [eEthereumNetwork.goerli]: ZERO_ADDRESS,
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
  },
  FlashLoanPremiums: {
    total: 0.0005e4,
    protocol: 0.0004e4,
  },
};
