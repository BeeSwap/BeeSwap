// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Deploy Token First
const BNB = artifacts.require("./HT.sol");

//Deploy QuotaDistribution
const QuotaDistribution = artifacts.require("./QuotaDistribution.sol");

// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployQuotaDistribution(deployer, network),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployQuotaDistribution(deployer, network) {
  
  let bnb = await BNB.deployed();

  console.log("[Golff] 1.Start deploy QuotaDistribution on Network= " + network);

  await deployer.deploy(QuotaDistribution, 1599904800, 175);
  
  console.log("[Golff] 2.Start add minter acl for distribution");

  bnb.addMinter(QuotaDistribution.address);

  console.log("[Golff] 3.Start set quota distributor");

  let disribution_account = "0x424abfc7c0Defb02447D621Bf0f6eF80eD5C01fB";

  let quota_distribution = new web3.eth.Contract(QuotaDistribution.abi, QuotaDistribution.address);

  await Promise.all([
    quota_distribution.methods.setQuotaDistribution(disribution_account).send({from: disribution_account}),
  ]);

  let init_quota = web3.utils.toBN(10 ** 18).mul(web3.utils.toBN(1000000 * 100));//.div(web3.utils.toBN(10 ** 4));
  
  console.log("[Golff] 4.Start set quota distributor");

  await Promise.all([
    quota_distribution.methods.addOrgQuota(disribution_account, init_quota.toString()).send({from: disribution_account}),
  ]);
  
  console.log("[Golff] 5.Start set quota distributor");

  await Promise.all([
    quota_distribution.methods.distributeQuota().send({from:disribution_account}),
  ]);
}