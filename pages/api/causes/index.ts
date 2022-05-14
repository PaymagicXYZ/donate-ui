import { getCeramicClient } from "../../../ceramic/client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import type { NextApiHandler } from "next";

const causesHandler: NextApiHandler = async (req, res) => {
  const ceramic = await getCeramicClient();
  const causeRegistery = await TileDocument.load(
    ceramic,
    process.env.REGISTERY_STREAM_ID
  );
  res.json(Object.keys(causeRegistery.content));
};

export default causesHandler;
