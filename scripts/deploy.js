// kovan link token address : 0xa36085F69e2889c224210F603D836748e7dC0088

const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main() {
  const kovanLinkTokenAddress = "0xa36085F69e2889c224210F603D836748e7dC0088"
  const ReservoirLevels = await hre.ethers.getContractFactory("ReservoirLevels");
  const reservoirLevels = await ReservoirLevels.deploy();

  await reservoirLevels.deployed();

  console.log("ReservoirLevelsContract deployed to:", reservoirLevels.address);

  await hre.run("fund-link", { contract: reservoirLevels.address, linkaddress: kovanLinkTokenAddress })

  // ReservoirLevels contract
  // get contract from artifacts
  const artifactsPath = path.join(__dirname, '../artifacts/contracts/ReservoirLevels.sol/ReservoirLevels.json')
  const compiledContract = JSON.parse(fs.readFileSync(artifactsPath))

  // copy contract to public directory
  const publicPath = path.join(__dirname, "../public/ReservoirLevels.json")
  const publicAddressPath = path.join(__dirname, "../public/ReservoirLevelsAddress.json")
  fs.writeFileSync(publicPath, JSON.stringify(compiledContract));
  fs.writeFileSync(publicAddressPath, JSON.stringify({ "address": reservoirLevels.address }))

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });