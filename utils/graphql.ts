import { BLOCKSYNC_GRAPHQL_URLS } from '@constants/api';
import { ChainNetwork } from 'types/chain';

const QUERY_ENTITY_BY_ID = `
  query queryEntityById($id: String!) {
    entity(id: $id) {
      id
      linkedResource
      service
      type
      status
    }
  }
`;

export async function queryEntityById(network: ChainNetwork, id: string) {
  try {
    const url = BLOCKSYNC_GRAPHQL_URLS[network];
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY_ENTITY_BY_ID,
        variables: { id },
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.data?.entity;
  } catch (error) {
    console.error('Error fetching entity:', error);
    throw error;
  }
}

const QUERY_CLAIM_COLLECTION_BY_ID = `
  query queryClaimCollectionById($id: String!) {
    claimCollection(id: $id) {
      id
      protocol
      entity
      endDate
      startDate
    }
  }
`;

export async function queryClaimCollectionById(network: ChainNetwork, claimCollectionId: string) {
  try {
    const url = BLOCKSYNC_GRAPHQL_URLS[network];
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY_CLAIM_COLLECTION_BY_ID,
        variables: { id: claimCollectionId },
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.data?.claimCollection;
  } catch (error) {
    console.error('Error fetching claim collection:', error);
    throw error;
  }
}
