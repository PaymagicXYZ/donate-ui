// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");
const ethers = require("ethers");
import ERC20ABI from "../../artifacts/contracts/TestERC20.sol/ERC20.json";
const provider = ethers.getDefaultProvider(
  "https://mainnet.infura.io/v3/f3c58d461e4e4bc7860f2a562ca71f10"
);

async function getApproval() {
  try {
    const url = `https://api.covalenthq.com/v1/1/events/topics/0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925/?secondary-topics=0xbbCB5065C3C3963f9f149E441e66b673fC0c0e40&starting-block=14000000&ending-block=latest&key=ckey_b2a03fc7e5834457b82017bcd36`;
    const response = await axios.get(url);
    const data = response.data ? response.data : [];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
const approvals = await getApproval();
const contract = new ethers.Contract(
  "0x111111111117dc0aa78b770fa6a738034120c302",
  ERC20ABI,
  provider
);
const balanceOf = await contract.balanceOf(
  "0x46ca0311e86d1086d4e14d1bd61472b844cfad75"
);
// const tx = await provider.getTransaction(
//   "0x8af111284edf727075a8aec5c184bdbf1bd597f7f9532f311eb75601b08c1a78"
// );

const cleanedApprovals = await Promise.all(
  approvals.data.items
    .filter((item) => item.decoded.params[2].value != 0)
    .map(async (e) => {
      // const contract = new ethers.Contract(e.sender_address, ERC20ABI, provider);
      // const amount = await contract.balanceOf(e.sender_address);
      const balance = ethers.utils.formatUnits(
        e.decoded.params[2].value,
        e.sender_contract_decimals
      );
      return {
        balance: balance,
        // amount: ethers.utils.formatUnits(amount),
        symbol: e.sender_contract_ticker_symbol,
        contract: e.sender_address,
        maker: e.decoded.params[0].value,
        time: e.block_signed_at,
        tx: await provider.getTransaction(e.tx_hash),
      };
    })
);

const checkedApprovals = await Promise.all(
  cleanedApprovals.map(async (e) => {
    const contract = new ethers.Contract(e.contract, ERC20ABI, provider);
    const amount = ethers.utils.formatUnits(await contract.balanceOf(e.maker));
    return [e, amount >= e.balance];
  })
);

const filteredApprovals = checkedApprovals.filter((e) => e[1]).map((e) => e[0]);
export default function handler(req, res) {
  res.status(200).json(filteredApprovals);
}
