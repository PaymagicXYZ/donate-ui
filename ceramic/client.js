import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { getResolver as getKeyResolver } from "key-did-resolver";
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";
import { ThreeIdProvider } from "@3id/did-provider";

export const getCeramicClient = () => {
  const gatewayURL = process.env.CERAMIC_GATEWAY_URL;
  const ceramic = new CeramicClient(gatewayURL);
  return ThreeIdProvider.create({
    authId: process.env.CERAMIC_AUTH_ID,
    authSecret: Uint8Array.from(process.env.CERAMIC_AUTH_SECRET),
    getPermission: (request) => Promise.resolve(request.payload.paths),
    ceramic,
  }).then((threeID) => {
    const did = new DID({
      provider: threeID.getDidProvider(),
      resolver: {
        ...get3IDResolver(ceramic),
        ...getKeyResolver(),
      },
    });
    ceramic.did = did;
    return ceramic;
  });
};
