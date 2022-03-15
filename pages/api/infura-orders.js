const ethers = require("ethers");
import ERC20ABI from "../../artifacts/contracts/TestERC20.sol/ERC20.json";
const provider = ethers.getDefaultProvider(
  "https://mainnet.infura.io/v3/f3c58d461e4e4bc7860f2a562ca71f10"
);
import tokenData from "../../components/CleanWallet/tokens.json";

const tokens = tokenData.tokens;
const orders = await Promise.all(
  tokens.map(async (token) => {
    const contract = new ethers.Contract(token.address, ERC20ABI, provider);
    const filter = contract.filters.Approval(
      null,
      "0xbbcb5065c3c3963f9f149e441e66b673fc0c0e40"
    );
    const filtered = await contract.queryFilter(filter, 14308945, "latest");
    return filtered;
  })
);

const openOrders = await Promise.all(
  orders.flat().map(async (order) => {
    const contract = new ethers.Contract(order.address, ERC20ABI, provider);
    const allowance = await contract.allowance(
      order.args[0],
      "0xbbcb5065c3c3963f9f149e441e66b673fc0c0e40"
    );
    const balance = await contract.balanceOf(order.args[0]);
    return [
      order,
      order.args[2],
      allowance,
      balance,
      allowance >= order.args[2] && allowance != 0,
    ];
  })
);

const filteredOpenOrders = openOrders
  .filter((order) => order[4])
  .map((order) => order[0]);

export default function handler(req, res) {
  res.status(200).json(filteredOpenOrders);
}
