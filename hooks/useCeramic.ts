import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { getResolver as getKeyResolver } from "key-did-resolver";
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";
import { ThreeIdProvider } from "@3id/did-provider";

export const useCeramic = async () => {
  const [ceramicClient, setCeramicClient] = useState<CeramicClient>();
  const { account } = useEthers();
  const {
    network: { provider },
  } = useNetwork();

  const getCeramic = () => {
    const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");
    ThreeIdProvider.create({
      authId: "myAuthID",
      authSecret: Uint8Array.from("17362917392846516239128747237192"),
      // See the section above about permissions management
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

      setCeramicClient({ ...ceramic, did } as CeramicClient);
      // setCeramicClient('heyy' as CeramicClient)
    });
  };

  useEffect(() => {
    if (provider) getCeramic();
  }, [provider, account]);

  return ceramicClient;
};
