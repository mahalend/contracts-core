import {utils} from 'ethers';

import {IInterestRateStrategyParams} from '../../helpers/types';

export const rateStrategyStableOne: IInterestRateStrategyParams = {
  name: 'rateStrategyStableOne',
  optimalUsageRatio: utils.parseUnits('0.9', 27).toString(),
  baseVariableBorrowRate: utils.parseUnits('0', 27).toString(),
  variableRateSlope1: utils.parseUnits('0.04', 27).toString(),
  variableRateSlope2: utils.parseUnits('0.6', 27).toString(),
  stableRateSlope1: utils.parseUnits('0.005', 27).toString(),
  stableRateSlope2: utils.parseUnits('0.6', 27).toString(),
  baseStableRateOffset: utils.parseUnits('0.01', 27).toString(),
  stableRateExcessOffset: utils.parseUnits('0.08', 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits('0.2', 27).toString(),
};

export const rateStrategyStableTwo: IInterestRateStrategyParams = {
  name: 'rateStrategyStableTwo',
  optimalUsageRatio: utils.parseUnits('0.8', 27).toString(),
  baseVariableBorrowRate: utils.parseUnits('0', 27).toString(),
  variableRateSlope1: utils.parseUnits('0.04', 27).toString(),
  variableRateSlope2: utils.parseUnits('0.75', 27).toString(),
  stableRateSlope1: utils.parseUnits('0.005', 27).toString(),
  stableRateSlope2: utils.parseUnits('0.75', 27).toString(),
  baseStableRateOffset: utils.parseUnits('0.01', 27).toString(),
  stableRateExcessOffset: utils.parseUnits('0.08', 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits('0.2', 27).toString(),
};

export const rateStrategyVolatileOne: IInterestRateStrategyParams = {
  name: 'rateStrategyVolatileOne',
  optimalUsageRatio: utils.parseUnits('0.45', 27).toString(),
  baseVariableBorrowRate: '0',
  variableRateSlope1: utils.parseUnits('0.07', 27).toString(),
  variableRateSlope2: utils.parseUnits('3', 27).toString(),
  stableRateSlope1: utils.parseUnits('0.07', 27).toString(),
  stableRateSlope2: utils.parseUnits('3', 27).toString(),
  baseStableRateOffset: utils.parseUnits('0.02', 27).toString(),
  stableRateExcessOffset: utils.parseUnits('0.05', 27).toString(),
  optimalStableToTotalDebtRatio: utils.parseUnits('0.2', 27).toString(),
};
