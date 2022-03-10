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
        token: [e.sender_contract_ticker_symbol, e.sender_address],
        maker: e.decoded.params[0].value,
        time: e.block_signed_at,
        // tx: await provider.getTransaction(e.tx_hash),
        tx: e.tx_hash,
      };
    })
);

const checkedApprovals = await Promise.all(
  cleanedApprovals.map(async (e) => {
    const contract = new ethers.Contract(e.token[1], ERC20ABI, provider);
    const amount = ethers.utils.formatUnits(await contract.balanceOf(e.maker));
    // const filter = contract.filters.Approval(
    //   e.maker,
    //   "0xbbcb5065c3c3963f9f149e441e66b673fc0c0e40"
    // );
    // const filtered = await contract.queryFilter(filter, 14000000, "latest");
    const allowance = await contract.allowance(
      e.maker,
      "0xbbcb5065c3c3963f9f149e441e66b673fc0c0e40"
    );
    return [e, amount >= e.balance && allowance != 0];
  })
);

const filteredApprovals = checkedApprovals.filter((e) => e[1]).map((e) => e[0]);
export default function handler(req, res) {
  res.status(200).json(filteredApprovals);
}
