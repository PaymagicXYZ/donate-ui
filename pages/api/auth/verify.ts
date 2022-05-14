import type { NextApiHandler } from "next";
import { SiweMessage } from "siwe";
import { withSession } from "../../../utils/withSession";

const verifyHandler: NextApiHandler = async (req, res) => {
  try {
    const messageData = new SiweMessage(req.body.message);
    const fields = await messageData.validate(req.body.signature);
    if (fields.nonce !== req.session.nonce) {
      res.status(422).json({
        message: `Invalid nonce.`,
      });
      return;
    }
    req.session.siwe = fields;
    await req.session.save();
    res.status(200).end();
  } catch (e) {
    await req.session.save();
    res.session.siwe = null;
    res.session.nonce = null;
    await res.session.save();
    res.status(400).json({ message: e.message });
  }
};

export default withSession(verifyHandler);
