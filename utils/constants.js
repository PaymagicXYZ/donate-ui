import { JsonRpcProvider } from '@ethersproject/providers'

export const env = process.env.REACT_APP_APP_ENV || 'test'; // defaulting to after ||
export const NETWORK = env === "production" ? `homestead` : 
  env === `mainnet` ? `mainnet` :
  env === `test` ? `kovan` :
  env === `kovan` ? `kovan` :
  env === `polygon` ? `matic` :
  `kovan`;
  
export const INFURA_ID = process.env.REACT_APP_INFURA_ID || '395c09a1d60042e2bcb49522b34fcb4e';
export const INFURA_LINK = env === "production" ? `https://mainnet.infura.io/v3/${INFURA_ID}` : 
  env === `mainnet` ? `https://mainnet.infura.io/v3/${INFURA_ID}` :
  env === `kovan` ? `https://kovan.infura.io/v3/${INFURA_ID}` :
  env === `polygon` ? `https://polygon-mainnet.infura.io/v3/${INFURA_ID}` :
  `kovan`;
export const infuraProvider = new JsonRpcProvider(INFURA_LINK);

export const BLOCK_EXPLORER_LINK = env === "production" ? `https://etherscan.io` : 
  env === `mainnet` ? `https://etherscan.io` :
  env === `kovan` ? `https://kovan.etherscan.io` :
  env === `polygon` ? `https://polygonscan.com` :
  `https://kovan.etherscan.io`;

export const BLOCKNATIVE_ID = process.env.REACT_APP_BLOCKNATIVE_ID || 'e6afe269-3ff9-4c3f-897e-6350774f7355';
export const ZAPPER_ID = process.env.REACT_APP_ZAPPER_ID || `96e0cc51-a62e-42ca-acee-910ea7d2a241`
