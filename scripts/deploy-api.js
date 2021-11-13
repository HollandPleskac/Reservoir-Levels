// kovan link token address : 0xa36085F69e2889c224210F603D836748e7dC0088

const hre = require("hardhat");

async function main() {
  const kovanLinkTokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
  const APIConsumer = await hre.ethers.getContractFactory("APIConsumer");
  const apiConsumerContract = await APIConsumer.deploy();

  await apiConsumerContract.deployed();

  console.log("APIConsumer deployed to:", apiConsumerContract.address);

  await hre.run("fund-link", { contract: apiConsumerContract.address, linkaddress: kovanLinkTokenAddress })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });