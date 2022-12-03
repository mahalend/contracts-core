# MahaLend Protocol

This repository contains the smart contracts source code and markets configuration for the MahaLend Protocol. The repository uses Docker Compose and Hardhat as development environment for compilation, testing and deployment tasks.

## What is MahaLend?

Aave is a decentralized non-custodial liquidity markets protocol where users can participate as suppliers or borrowers. Suppliers provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.

- [Developer Documentation](https://docs.mahalend.com)

## Connect with the community

You can join at the [Discord](http://discord.gg/mahadao) channel or at the [Governance Forum](https://discuss.mahadao.com/) for asking questions about the protocol or talk about MahaLend with other peers.

## Getting Started

You can install `@mahalend/core-v3` as an NPM package in your Hardhat or Truffle project to import the contracts and interfaces:

`npm install @mahalend/core-v3`

Import at Solidity files:

```
import {IPool} from "@mahalend/core-v3/contracts/interfaces/IPool.sol";

contract Misc {

  function supply(address pool, address token, address user, uint256 amount) public {
    IPool(pool).supply(token, amount, user, 0);
    {...}
  }
}
```

The JSON artifacts with the ABI and Bytecode are also included into the bundled NPM package at `artifacts/` directory.

Import JSON file via Node JS `require`:

```
const PoolV3Artifact = require('@mahalend/core-v3/artifacts/contracts/protocol/pool/Pool.sol/Pool.json');

// Log the ABI into console
console.log(PoolV3Artifact.abi)
```

## Setup

The repository uses Docker Compose to manage sensitive keys and load the configuration. Prior any action like test or deploy, you must run `docker-compose up` to start the `contracts-env` container, and then connect to the container console via `docker-compose exec contracts-env bash`.

Follow the next steps to setup the repository:

- Install `docker` and `docker-compose`
- Create an enviroment file named `.env` and fill the next enviroment variables

```
# Add Alchemy or Infura provider keys, alchemy takes preference at the config level
ALCHEMY_KEY=""
INFURA_KEY=""


# Optional, if you plan to use Tenderly scripts
TENDERLY_PROJECT=""
TENDERLY_USERNAME=""

```

## Test

You can run the full test suite with the following commands:

```
# In one terminal
docker-compose up

# Open another tab or terminal
docker-compose exec contracts-env bash

# A new Bash terminal is prompted, connected to the container
npm run test
```
