// Claim Collection IDs for Carbon Offset Claims
export const MAINNET_OFFSET_CLAIM_COLLECTION_IDS =
  process.env.NEXT_PUBLIC_MAINNET_OFFSET_CLAIM_COLLECTION_IDS?.split(',')?.map((v) => v.trim()) ?? [];
export const TESTNET_OFFSET_CLAIM_COLLECTION_IDS =
  process.env.NEXT_PUBLIC_TESTNET_OFFSET_CLAIM_COLLECTION_IDS?.split(',')?.map((v) => v.trim()) ?? [];
export const DEVNET_OFFSET_CLAIM_COLLECTION_IDS =
  process.env.NEXT_PUBLIC_DEVNET_OFFSET_CLAIM_COLLECTION_IDS?.split(',')?.map((v) => v.trim()) ?? [];

// TEMP Claim Survey Title for Carbon Offset Claims
export const MAINNET_OFFSET_CLAIM_SURVEY_TITLE =
  process.env.NEXT_PUBLIC_MAINNET_OFFSET_CLAIM_SURVEY_TITLE ?? 'Voluntary Carbon Offset';
export const TESTNET_OFFSET_CLAIM_SURVEY_TITLE =
  process.env.NEXT_PUBLIC_TESTNET_OFFSET_CLAIM_SURVEY_TITLE ?? 'Voluntary Carbon Offset';
export const DEVNET_OFFSET_CLAIM_SURVEY_TITLE =
  process.env.NEXT_PUBLIC_DEVNET_OFFSET_CLAIM_SURVEY_TITLE ?? 'Voluntary Carbon Offset';
