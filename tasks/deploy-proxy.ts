import {ethers} from 'hardhat';
import {PoolConfigurator} from '../types';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address is ${deployer.address}`);

  const factory = await ethers.getContractFactory('InitializableImmutableAdminUpgradeabilityProxy');
  const instance = await factory.deploy('0x6357EDbfE5aDA570005ceB8FAd3139eF5A8863CC'); // instance
  await instance.deployed();
  console.log(instance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
