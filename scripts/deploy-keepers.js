// kovan link token address : 0xa36085F69e2889c224210F603D836748e7dC0088

const hre = require("hardhat");

async function main() {
  const kovanLinkTokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
  const Keepers = await hre.ethers.getContractFactory("Counter");
  const keepers = await Keepers.deploy(30);

  await keepers.deployed();

  console.log("KeepersContract deployed to:", keepers.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });