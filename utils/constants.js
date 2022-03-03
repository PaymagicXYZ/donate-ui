import { JsonRpcProvider } from "@ethersproject/providers";

export const DUSTSWEEPER_ADDRESS =
  process.env.REACT_APP_DUSTSWEEPER ||
  "0xbbCB5065C3C3963f9f149E441e66b673fC0c0e40";

export const env = process.env.REACT_APP_APP_ENV || "test"; // defaulting to after ||
export const NETWORK =
  env === "production"
    ? `homestead`
    : env === `mainnet`
    ? `mainnet`
    : env === `test`
    ? `kovan`
    : env === `kovan`
    ? `kovan`
    : env === `polygon`
    ? `matic`
    : `kovan`;

export const INFURA_ID =
  process.env.REACT_APP_INFURA_ID || "395c09a1d60042e2bcb49522b34fcb4e";
export const INFURA_LINK =
  env === "production"
    ? `https://mainnet.infura.io/v3/${INFURA_ID}`
    : env === `mainnet`
    ? `https://mainnet.infura.io/v3/${INFURA_ID}`
    : env === `kovan`
    ? `https://kovan.infura.io/v3/${INFURA_ID}`
    : env === `polygon`
    ? `https://polygon-mainnet.infura.io/v3/${INFURA_ID}`
    : `kovan`;
export const infuraProvider = new JsonRpcProvider(INFURA_LINK);

export const BLOCK_EXPLORER_LINK = {
  production: `https://etherscan.io`,
  development: `https://etherscan.io`,
  mainnet: `https://etherscan.io`,
  kovan: `https://kovan.etherscan.io`,
  polygon: `https://polygonscan.com`,
};

export const BLOCKNATIVE_ID =
  process.env.REACT_APP_BLOCKNATIVE_ID ||
  "e6afe269-3ff9-4c3f-897e-6350774f7355";
export const ZAPPER_ID =
  process.env.REACT_APP_ZAPPER_ID || `96e0cc51-a62e-42ca-acee-910ea7d2a241`;

export const ZAPPER_NETWORK =
  env === "production"
    ? `ethereum`
    : env === `mainnet`
    ? `ethereum`
    : env === `test`
    ? `kovan`
    : env === `kovan`
    ? `kovan`
    : env === `polygon`
    ? `matic`
    : `kovan`;

export const ZERION_API_KEY =
  process.env.REACT_APP_ZERION_API_KEY ||
  "Paymagic.pBHI7DOsXaHAuHE7fFQQoBKkejC6ERUy";

export const COVALENT_API_KEY =
  process.env.REACT_APP_COVALENT_API_KEY || "ckey_b2a03fc7e5834457b82017bcd36";
export const CovalentNetworkForID = {
  eth: "1",
  mainnet: "1",
  ethereum: "1",
  matic: "137",
  polygon: "137",
  ava: "43114",
};

export const DISPERSE_MAINNET = "0x5d49D619fc568e610f7e8e9d3981e6474f60179F";
export const DISPERSE_POLYGON = "0xeA1da800c794228DcD8DA1e4A8F824F7F52999FB";
export const DISPERSE_KOVAN = "0xA749721d764FF378a41D9b4D0794f7aFde4372E8";

export const DISPERSENFT_MAINNET = "0x"; // Not deployed yet
export const DISPERSENFT_POLYGON = "0x56a351f917cC65C5023C347B693fd3588B921250";
export const DISPERSENFT_KOVAN = "0x489dfbf54845150a880BE13aC8DB2ce954986789";

export const AIRDROP_FACTORY_MAINNET = "0x"; // Not deployed yet
export const AIRDROP_FACTORY_POLYGON = "0x"; // Not deployed yet
export const AIRDROP_FACTORY_KOVAN =
  "0x08A9E551e14BFD1C94E5e3a3F669A458d3F5E403";
