// ++++++++++++++++ Define Contracts ++++++++++++++++ 

//Deploy Token First
const BeeswapToken = artifacts.require("./Beeswap.sol");

//Deploy Pool
const BeeswapBNBPool = artifacts.require("./BeeswapBNBPool.sol");
const BeeswapGOFPool = artifacts.require("./BeeswapGOFPool.sol");
const BeeswapGXCPool = artifacts.require("./BeeswapGXCPool.sol");
const BeeswapHTPool = artifacts.require("./BeeswapHTPool.sol");
const BeeswapUNIPool = artifacts.require("./BeeswapUNIPool.sol");
const BeeswapUSDTPool = artifacts.require("./BeeswapUSDTPool.sol");
const BeeswapWETHPool = artifacts.require("./BeeswapWETHPool.sol");
const BeeswapYFIIPool = artifacts.require("./BeeswapYFIIPool.sol");

// ++++++++++++++++  Main Migration ++++++++++++++++ 

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployPool(deployer, network),
  ]);
};

module.exports = migration;

// ++++++++++++++++  Deploy Functions ++++++++++++++++ 
async function deployPool(deployer, network) {
  
  let beeswap = new web3.eth.Contract(BeeswapToken.abi, '0x1A754244EC6C879C38dD4a774e3979d77D414Bc1');

  let reward_account = "0x424abfc7c0Defb02447D621Bf0f6eF80eD5C01fB";

  console.log("[HUB] 1.Start deploy pool on Network= " + network);

  await deployer.deploy(BeeswapBNBPool);
  await deployer.deploy(BeeswapGOFPool);
  await deployer.deploy(BeeswapGXCPool);
  await deployer.deploy(BeeswapUNIPool);
  
  await deployer.deploy(BeeswapHTPool);
  await deployer.deploy(BeeswapUSDTPool);
  await deployer.deploy(BeeswapWETHPool);
  await deployer.deploy(BeeswapYFIIPool);
  
  console.log("[HUB] 2.Start add minter acl for pool");
  await Promise.all([
    beeswap.methods.addMinter(BeeswapBNBPool.address),
    beeswap.methods.addMinter(BeeswapGOFPool.address),
    beeswap.methods.addMinter(BeeswapGXCPool.address),
    beeswap.methods.addMinter(BeeswapUNIPool.address),
    beeswap.methods.addMinter(BeeswapHTPool.address),
    beeswap.methods.addMinter(BeeswapUSDTPool.address),
    beeswap.methods.addMinter(BeeswapWETHPool.address),
    beeswap.methods.addMinter(BeeswapYFIIPool.address)
  ]);

  // console.log("[Beeswap] 3.Start set reward distributor");

  // let bnb_pool = new web3.eth.Contract(BeeswapBNBPool.abi, BeeswapBNBPool.address);
  // let gof_pool = new web3.eth.Contract(BeeswapGOFPool.abi, BeeswapGOFPool.address);
  // let gxc_pool = new web3.eth.Contract(BeeswapGXCPool.abi, BeeswapGXCPool.address);
  // let uni_pool = new web3.eth.Contract(BeeswapUNIPool.abi, BeeswapUNIPool.address);
  // let ht_pool = new web3.eth.Contract(BeeswapHTPool.abi, BeeswapHTPool.address);
  // let usdt_pool = new web3.eth.Contract(BeeswapUSDTPool.abi, BeeswapUSDTPool.address);
  // let weth_pool = new web3.eth.Contract(BeeswapWETHPool.abi, BeeswapWETHPool.address);
  // let yfii_pool = new web3.eth.Contract(BeeswapYFIIPool.abi, BeeswapYFIIPool.address);

  // await Promise.all([
  //   bnb_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   gof_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   gxc_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   uni_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   ht_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   usdt_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   weth_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  //   yfii_pool.methods.setRewardDistribution(reward_account).send({ from: reward_account}),
  // ]);

  // console.log("[Golff] 4.Start reward Gof to pool");

  // let init_quota = web3.utils.toBN(10 ** 18).mul(web3.utils.toBN(70000)).div(web3.utils.toBN(10 ** 4));

  // await Promise.all([
  //   bnb_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   gof_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   gxc_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   uni_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   ht_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   usdt_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   weth_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000}),
  //   yfii_pool.methods.notifyRewardAmount(init_quota.toString()).send({ from: reward_account, gas: 100000})
  // ]);
}