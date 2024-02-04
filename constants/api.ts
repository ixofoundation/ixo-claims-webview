import { ChainNetwork } from 'types/chain';

export const BLOCKSYNC_GRAPHQL_URLS: { [network in ChainNetwork]: string } = {
  mainnet: 'https://blocksync-graphql.ixo.earth/graphql',
  testnet: 'https://testnet-blocksync-graphql.ixo.earth/graphql',
  devnet: 'https://devnet-blocksync-graphql.ixo.earth/graphql',
};

export const BLOCKSYNC_API_URLS: { [network in ChainNetwork]: string } = {
  mainnet: 'https://blocksync-graphql.ixo.earth/api',
  testnet: 'https://testnet-blocksync-graphql.ixo.earth/api',
  devnet: 'https://devnet-blocksync-graphql.ixo.earth/api',
};
