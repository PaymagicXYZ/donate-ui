import type { NextApiHandler } from "next";
import { getCeramicClient } from "../../../ceramic/client";
import { TileDocument } from "@ceramicnetwork/stream-tile";

const causeHandler: NextApiHandler = async (req, res) => {
  const ceramic = await getCeramicClient();
  const newRegistery = await TileDocument.create(ceramic, {});
  const newID = newRegistery.id.toString();
  console.log("new REGISTERY_STREAM_ID:", newID);
  res.status(200).json({ stream_id: newID });
};

export default causeHandler;
