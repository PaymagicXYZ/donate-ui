// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");
const ethers = require("ethers");
async function getApproval() {
  try {
    const url = `https://api.covalenthq.com/v1/1/events/topics/0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925/?secondary-topics=0xbbCB5065C3C3963f9f149E441e66b673fC0c0e40&starting-block=14000000&ending-block=latest&key=ckey_b2a03fc7e5834457b82017bcd36&page-size=999999`;
    const response = await axios.get(url);
    const data = response.data ? response.data : [];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
const approvals = await getApproval();

export default function handler(req, res) {
  res.status(200).json(
    approvals.data.items
      .filter((item) => item.decoded.params[2].value != 0)
      .reverse()
      .map((e) => {
        return {
          balance: ethers.utils.formatUnits(
            e.decoded.params[2].value,
            e.sender_contract_decimals
          ),
          symbol: e.sender_contract_ticker_symbol,
          maker: e.decoded.params[0].value,
          time: e.block_signed_at,
          tx: e.tx_hash,
        };
      })
  );
}
