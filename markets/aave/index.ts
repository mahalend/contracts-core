import {ZERO_ADDRESS} from '../../helpers/constants';
import {IAaveConfiguration, eEthereumNetwork} from '../../helpers/types';

import {CommonsConfig} from './commons';
import {strategyDAI, strategyUSDC, strategyARTH, strategyWETH} from './reservesConfigs';

export const AaveConfig: IAaveConfiguration = {
  ...CommonsConfig,
  MarketId: 'Ethereum Aave Market',
  ATokenNamePrefix: 'Ethereum',
  StableDebtTokenNamePrefix: 'Ethereum',
  VariableDebtTokenNamePrefix: 'Ethereum',
  SymbolPrefix: 'Eth',
  ProviderId: 30,
  ReservesConfig: {
    DAI: strategyDAI,
    ARTH: strategyARTH,
    USDC: strategyUSDC,
    WETH: strategyWETH,
    WMATIC: strategyWETH,
  },
  ReserveAssets: {
    [eEthereumNetwork.goerli]: {
      DAI: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      WMATIC: ZERO_ADDRESS,
    },
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.polygon]: {
      DAI: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      ARTH: '0xe52509181feb30eb4979e29ec70d50fd5c44d590',
      USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
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
    [eEthereumNetwork.main]: {
      DAI: ZERO_ADDRESS,
      ARTH: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      WMATIC: ZERO_ADDRESS,
    },
  },
  StkAaveProxy: {
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.goerli]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.polygon]: ZERO_ADDRESS,
    [eEthereumNetwork.main]: ZERO_ADDRESS,
  },
};

export default AaveConfig;
