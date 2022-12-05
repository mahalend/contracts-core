import {ZERO_ADDRESS} from '../../helpers/constants';
import {ICommonConfiguration, eEthereumNetwork} from '../../helpers/types';

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons MahaLend Market',
  ATokenNamePrefix: 'Ethereum',
  StableDebtTokenNamePrefix: 'Ethereum',
  VariableDebtTokenNamePrefix: 'Ethereum',
  SymbolPrefix: 'ETH',
  ProviderId: 8080,
  OracleQuoteCurrencyAddress: ZERO_ADDRESS,
  OracleQuoteCurrency: 'USD',
  OracleQuoteUnit: '8',
  WrappedNativeTokenSymbol: 'WETH',
  ChainlinkAggregator: {
    [eEthereumNetwork.main]: {
      DAI: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
      ARTH: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
      USDC: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
      WETH: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
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
      DAI: '0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D',
      ARTH: '0x4746DeC9e833A82EC7C2C1356372CcF2cfcD2F3D',
      USDC: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7',
      WETH: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
      WMATIC: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
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
