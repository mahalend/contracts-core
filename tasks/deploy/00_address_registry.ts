import {waitForTx} from '../../helpers/misc-utils';
import {COMMON_DEPLOY_PARAMS} from '../../helpers/env';

const func = async function ({getNamedAccounts, deployments, ...hre}) {
  const {deploy} = deployments;
  const {deployer, addressesProviderRegistryOwner} = await getNamedAccounts();
  const poolAddressesProviderRegistryArtifact = await deploy('PoolAddressesProviderRegistry', {
    from: deployer,
    args: [deployer],
    ...COMMON_DEPLOY_PARAMS,
  });
  const registryInstance = await hre.ethers.getContractAt(
    poolAddressesProviderRegistryArtifact.abi,
    poolAddressesProviderRegistryArtifact.address
  );
  await waitForTx(await registryInstance.transferOwnership(addressesProviderRegistryOwner));
  deployments.log(
    `[Deployment] Transferred ownership of PoolAddressesProviderRegistry to: ${addressesProviderRegistryOwner} `
  );
  return true;
};
