require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      gas: 2100000,
      gasPrice: 8000000000,
      chainId: 1337,
    },
    
  },
  paths: {
    artifacts: "../Frontend/src/artifacts",
  },
};
