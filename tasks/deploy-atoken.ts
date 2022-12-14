import {ethers} from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer address is ${deployer.address}`);

  const factory = await ethers.getContractFactory('AToken');
  const instance = await factory.deploy('0x76F0C94Ced5B48020bf0D7f3D0CEabC877744cB5');
  await instance.deployed();
  console.log(`${instance.address} -> tx hash: ${instance.deployTransaction.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
