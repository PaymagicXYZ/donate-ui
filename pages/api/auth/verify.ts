import type { NextApiHandler } from "next";
import { supabaseServer as supabase } from "../../../lib/supabase";
import jwt from "jsonwebtoken";
import { SiweMessage } from "siwe";
import { withSession } from "../../../utils/withSession";

const verifyHandler: NextApiHandler = async (req, res) => {
  const messageData = new SiweMessage(req.body.message);
  const userAuthData = await messageData.validate(req.body.signature);
  if (userAuthData.nonce !== req.session.nonce) {
    res.status(422).json({
      message: `Invalid nonce.`,
    });
    return;
  }

  // look for existing user
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("eth_address", userAuthData.address);

  if (error) res.status(500).end(error);

  let user;
  if (data.length) {
    // if user already exists
    user = data[0];
  } else {
    // sign in user
    const { data, error } = await supabase
      .from("user")
      .insert({ eth_address: userAuthData.address })
      .single();

    if (error) res.status(500).end(error);
    user = data;
  }

  const token = jwt.sign(
    {
      aud: "authenticated",
      sub: user.id,
      exp: Math.floor(Date.now() / 1000 + 60 * 60),
      role: "authenticated",
      user_metadata: {
        id: user.id,
      },
    },
    process.env.SUPABASE_JWT_SECRET
  );
  res.json({ token });
};

export default withSession(verifyHandler);
