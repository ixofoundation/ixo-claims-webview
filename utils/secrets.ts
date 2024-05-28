// IXO Blocksync GraphQL URLs (used to fetch claim collections)
export const DEVNET_BLOCKSYNC_GRAPHQL_URL = process.env.NEXT_PUBLIC_DEVNET_BLOCKSYNC_GRAPHQL_URL ?? '';
export const TESTNET_BLOCKSYNC_GRAPHQL_URL = process.env.NEXT_PUBLIC_TESTNET_BLOCKSYNC_GRAPHQL_URL ?? '';
export const MAINNET_BLOCKSYNC_GRAPHQL_URL = process.env.NEXT_PUBLIC_MAINNET_BLOCKSYNC_GRAPHQL_URL ?? '';

// Entity IDs for the Offset DAOs (used to determine offset claim collections)
export const DEVNET_OFFSET_DAO_ENTITY_ID = process.env.NEXT_PUBLIC_DEVNET_OFFSET_DAO_ENTITY_ID ?? '';
export const TESTNET_OFFSET_DAO_ENTITY_ID = process.env.NEXT_PUBLIC_TESTNET_OFFSET_DAO_ENTITY_ID ?? '';
export const MAINNET_OFFSET_DAO_ENTITY_ID = process.env.NEXT_PUBLIC_MAINNET_OFFSET_DAO_ENTITY_ID ?? '';
