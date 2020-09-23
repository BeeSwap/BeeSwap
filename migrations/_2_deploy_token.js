// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Token First
const BNB = artifacts.require("./BNB.sol");
const GOF = artifacts.require("./GOF.sol");
const GXC = artifacts.require("./GXC.sol");
const HT = artifacts.require("./HT.sol");
const USDT = artifacts.require("./USDT.sol");
const WETH = artifacts.require("./WETH.sol");
const YFII = artifacts.require("./YFII.sol");
const UNI = artifacts.require("./UNI.sol");

// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployToken(deployer, network),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployToken(deployer, network) {
  await deployer.deploy(BNB);
  await deployer.deploy(GOF);
  await deployer.deploy(GXC);
  await deployer.deploy(HT);
  await deployer.deploy(YFII);
  await deployer.deploy(UNI);
  await deployer.deploy(USDT);
  await deployer.deploy(WETH);
}