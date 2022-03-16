const ethers = require("ethers");
import ERC20ABI from "../../artifacts/contracts/TestERC20.sol/ERC20.json";
const provider = ethers.getDefaultProvider(
  "https://mainnet.infura.io/v3/f3c58d461e4e4bc7860f2a562ca71f10"
);
import tokenData from "../../components/CleanWallet/tokens.json";

const tokens = tokenData.tokens;
const tokenAddressesMap = {};
tokens.forEach((token) => {
  tokenAddressesMap[token.address] = [token.symbol, token.name, token.decimals];
});

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
    const time = await provider.getBlock(order.blockNumber);
    return [
      order,
      order.args[2],
      allowance,
      balance,
      balance >= allowance &&
        balance >= order.args[2] &&
        allowance >= order.args[2] &&
        allowance != 0,
      time,
    ];
  })
);

const filteredOpenOrders = await Promise.all(
  openOrders
    .filter((order) => order[4])
    .map(async (order) => {
      const address = order[0].address.toLowerCase();
      const symbol = tokenAddressesMap[address][0];
      const time = new Date(order[5].timestamp * 1000);
      return {
        balance: ethers.utils.formatUnits(
          order[0].args[2],
          tokenAddressesMap[address][2]
        ),
        token: [symbol, address],
        maker: order[0].args[0],
        time: time,
        tx: order[0].transactionHash,
      };
    })
);

export default function handler(req, res) {
  res.status(200).json(filteredOpenOrders);
}
