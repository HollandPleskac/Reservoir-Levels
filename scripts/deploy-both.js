// kovan link token address : 0xa36085F69e2889c224210F603D836748e7dC0088

const hre = require("hardhat");

async function main() {
  const kovanLinkTokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
  const KeepersAndAPI = await hre.ethers.getContractFactory("KeepersAndAPI");
  const keepersAndAPI = await KeepersAndAPI.deploy(30);

  await keepersAndAPI.deployed();

  console.log("Keepers&API Contract deployed to:", keepersAndAPI.address);

  await hre.run("fund-link", { contract: keepersAndAPI.address, linkaddress: kovanLinkTokenAddress })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });