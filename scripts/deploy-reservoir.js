// kovan link token address : 0xa36085F69e2889c224210F603D836748e7dC0088

const hre = require("hardhat");

async function main() {
  const kovanLinkTokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
  const ReservoirLevels = await hre.ethers.getContractFactory("ReservoirLevels");
  const reservoirLevels = await ReservoirLevels.deploy();

  await reservoirLevels.deployed();

  console.log("ReservoirLevelsContract deployed to:", reservoirLevels.address);

  await hre.run("fund-link", { contract: reservoirLevels.address, linkaddress: kovanLinkTokenAddress })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });