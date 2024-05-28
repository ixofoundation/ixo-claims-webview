import { ChainNetwork } from 'types/chain';
import { getBlocksyncGraphqlUrl } from './api';
import { IRequestResult } from 'types/gql';

export default async function gqlQuery<TReturn>(network: ChainNetwork, query: string): IRequestResult<TReturn> {
  try {
    const blocksyncGraphqlUrl = getBlocksyncGraphqlUrl(network);
    const response = await fetch(blocksyncGraphqlUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = (await response.json()) as TReturn;

    return { data };
  } catch (error) {
    return { error: error as Error };
  }
}
