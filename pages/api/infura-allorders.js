const ethers = require("ethers");
import ERC20ABI from "../../artifacts/contracts/TestERC20.sol/ERC20.json";
const provider = ethers.getDefaultProvider(
  "https://mainnet.infura.io/v3/f3c58d461e4e4bc7860f2a562ca71f10"
);
import tokenData from "../../components/CleanWallet/tokens.json";

const tokens = tokenData.tokens;
const approvals = await Promise.all(
  tokens.map(async (token) => {
    const contract = new ethers.Contract(token.address, ERC20ABI, provider);
    const filter = contract.filters.Approval(
      null,
      "0xbbcb5065c3c3963f9f149e441e66b673fc0c0e40"
    );
    const filtered = await contract.queryFilter(filter, 14000000, "latest");
    return {
      name: token.symbol,
      approvals: filtered,
    };
  })
);

export default function handler(req, res) {
  res.status(200).json(approvals);
}
