import { getCeramicClient } from "../../../ceramic/client";
import { TileDocument } from "@ceramicnetwork/stream-tile";

export default async function handler(req, res) {
  const ceramic = await getCeramicClient();
  const causeRegistery = await TileDocument.load(
    ceramic,
    process.env.REGISTERY_STREAM_ID
  );
  const { cause } = req.query;
  if (req.method === "POST") {
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
  } else {
    if (causeRegistery.content[cause]) {
      const streamID = causeRegistery.content[cause];
      const causeData = await TileDocument.load(ceramic, streamID);
      res.status(200).json(causeData.content);
    } else {
      res.status(404).send("Cause does not exist");
    }
  }
}
