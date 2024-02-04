import { CHAIN_IDS } from '@constants/chain';
import { ChainNetwork } from 'types/chain';

export const getChainIdFromNetwork = (network: ChainNetwork): string => CHAIN_IDS[network];
