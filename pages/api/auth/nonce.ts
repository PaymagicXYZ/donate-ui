import type { NextApiHandler } from "next";
import { generateNonce, SiweMessage } from "siwe";
import { withSession } from "../../../utils/withSession";

const nonceHandler: NextApiHandler = async (req, res) => {
  const nonce = generateNonce();
  req.session.nonce = nonce;
  await req.session.save();
  res.json(nonce);
};

export default withSession(nonceHandler);
