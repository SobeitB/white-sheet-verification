import { ethers } from "hardhat";
import path from 'path';
import * as fs from "fs";
const hre = require('hardhat');

async function main() {

  const [owner] = await ethers.getSigners();
  // const whiteList = await ethers.getContractFactory("WhiteList");
  // const WhiteList = await whiteList.deploy();
  //
  // await WhiteList.deployed();
  //
  // console.log(`address - ${WhiteList.address}`);
  //
  // saveFrontendFiles({
  //   WhiteList:WhiteList
  // });


  const users = [
     '0xd70892e3EE08C34bE72AD99f4391F92c617D1E9a',
     '0xD3294395bA02e90895265555Dc831b4b163A7C45',
     '0xC1F93c680bCB1d30e92Aa587A9E7b5dFC6999379',
     '0x61bAb6d92B2D51bff6eC57053FebDAdE837dc630',
     '0x61bAb6d92B2D51bff6eC57053FebDAdE837dc630',
     '0x39fDFBE7294BeF7B2e3a3FcB9786120793cF94A0',
  ]

  const signers:Record<string, string> = {}


  for await (const contents of
     users.map(async (account:string) => {
       const dataHash = ethers.utils.id(account.toLowerCase())
       const messageBytes = ethers.utils.arrayify(dataHash)

       signers[account.toLowerCase()] = await owner.signMessage(messageBytes)
     })
  )

   fs.writeFile('../src/shared/lib/contracts/signature.json', JSON.stringify(signers), 'utf8', () => {});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function saveFrontendFiles(contracts:any) {
  const contractsDir = path.join(__dirname, '/../..', 'src/shared/lib/contracts')

  Object.entries(contracts).forEach((contract_item:any) => {
    const [name, contract] = contract_item;

    if(contract) {
      fs.writeFileSync(
         path.join(contractsDir, '/', name + '-contract-address.json'),
         JSON.stringify({[name]: contract.address}, undefined, 2)
      )
    }

    const ContractArtifact = hre.artifacts.readArtifactSync(name)

    fs.writeFileSync(
       path.join(contractsDir, '/', name + ".json"),
       JSON.stringify(ContractArtifact, null, 2)
    )


  })
}