import type { NextApiHandler } from "next";
import { withSession } from "../../../utils/withSession";
import { getCeramicClient } from "../../../ceramic/client";
import { TileDocument } from "@ceramicnetwork/stream-tile";

const causeHandler: NextApiHandler = async (req, res) => {
  const { cause } = req.query;
  if (typeof cause === "string") {
    if (req.method === "POST") {
      // if (!req.session.siwe)
      //   res.status(401).json({ message: "Must sign in to create a cause" });
      // else {
      const ceramic = await getCeramicClient();
      const causeRegistery = await TileDocument.load(
        ceramic,
        process.env.REGISTERY_STREAM_ID
      );
      if (causeRegistery.content[cause]) {
        res.status(400).send("cause already exists");
      } else {
        const newCause = await TileDocument.create(ceramic, req.body);
        await causeRegistery.update({
          ...causeRegistery.content,
          [cause]: newCause.id.toString(),
        });
        res.status(201).send("created");
      }
      // }
    } else if (req.method === "GET") {
      const ceramic = await getCeramicClient();
      const causeRegistery = await TileDocument.load(
        ceramic,
        process.env.REGISTERY_STREAM_ID
      );
      if (causeRegistery.content[cause]) {
        const streamID = causeRegistery.content[cause];
        const causeData = await TileDocument.load(ceramic, streamID);
        res.status(200).json(causeData.content);
      } else {
        res.status(404).send("Cause does not exist");
      }
    }
  } else res.status(400).end();
};

export default withSession(causeHandler);
