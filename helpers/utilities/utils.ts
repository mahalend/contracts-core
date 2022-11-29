import {utils} from 'ethers/lib';

import {ZERO_ADDRESS} from '../constants';

export const isValidAddress = (value: string) => {
  return (
    !!value && utils.isAddress(value) && utils.getAddress(value) !== utils.getAddress(ZERO_ADDRESS)
  );
};

export const chunk = <T>(arr: T[], chunkSize: number): T[][] => {
  return arr.reduce(
    (prevVal: Array<T[]>, currVal: T, currIndx: number, array: Array<T>) =>
      !(currIndx % chunkSize)
        ? prevVal.concat([array.slice(currIndx, currIndx + chunkSize)])
        : prevVal,
    []
  );
};

export const filterMapBy = (
  raw: {
    [key: string]: any;
  },
  fn: (key: string) => boolean
): {
  [key: string]: any;
} =>
  Object.keys(raw)
    .filter(fn)
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {});

export const isEqualAddress = (a: string, b: string): boolean =>
  utils.getAddress(a) === utils.getAddress(b);

export const containsSameMembers = (arr1: any[], arr2: any[]): boolean => {
  return arr1.sort().join(',') === arr2.sort().join(',');
};
