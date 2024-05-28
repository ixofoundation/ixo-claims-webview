import { BLOCKSYNC_GRAPHQL_URLS } from '@constants/api';
import { ChainNetwork } from 'types/chain';

const QUERY_ENTITY_BY_ID = `
  query queryEntityById($id: String!) {
    entity(id: $id) {
      id
      linkedResource
      service
      settings
      type
      status
    }
  }
`;

export async function queryEntityById(
  network: ChainNetwork,
  id: string,
): Promise<{
  id: string;
  linkedResource: string;
  service: unknown;
  settings: unknown;
  type: string;
  status: number;
}> {
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

const QUERY_ENTITIES_BY_RELAYER_NODE = `
  query queryEntitiesByRelayerNode($relayerNode: String!, $currentDateTime: Datetime!) {
    entities(
      filter: {
        and: {
          type: { equalTo: "protocol/claim" }
          relayerNode: { equalTo: $relayerNode }
          startDate: { lessThan: $currentDateTime }
          endDate: { greaterThan: $currentDateTime }
          entityVerified: { equalTo: true }
          status: { equalTo: 0 }
        }
      }
    ) {
      totalCount
      nodes {
        id
      }
    }
  }
`;

export async function queryEntitiesByRelayerNode(
  network: ChainNetwork,
  relayerNode: string,
): Promise<
  {
    id: string;
  }[]
> {
  try {
    const currentDateTime = new Date().toISOString();
    const url = BLOCKSYNC_GRAPHQL_URLS[network];
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY_ENTITIES_BY_RELAYER_NODE,
        variables: { relayerNode, currentDateTime },
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.data?.entities?.nodes;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw error;
  }
}

const QUERY_CLAIM_COLLECTIONS_BY_ENTITY_AND_PROTOCOLS = `
  query queryClaimCollectionsByEntityAndProtocols($entity: String!, $currentDateTime: Datetime!, $protocols: [String!]!) {
    claimCollections(filter: {
      and: {
        entity: { equalTo: $entity }
        startDate: { lessThan: $currentDateTime }
        endDate: { greaterThan: $currentDateTime }
        protocol: { in: $protocols }
        state: { equalTo: 0 }
      }
    }) {
      totalCount
      nodes {
        id
        quota
        count
      }
    }
  }
`;

export async function queryClaimCollectionsByEntityAndProtocols(
  network: ChainNetwork,
  entity: string,
  protocols: string[],
): Promise<
  Array<{
    id: string;
    quota: number;
    count: number;
  }>
> {
  try {
    const currentDateTime = new Date().toISOString();
    const url = BLOCKSYNC_GRAPHQL_URLS[network];
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY_CLAIM_COLLECTIONS_BY_ENTITY_AND_PROTOCOLS,
        variables: { entity, currentDateTime, protocols },
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.data?.claimCollections?.nodes;
  } catch (error) {
    console.error('Error fetching claim collection:', error);
    throw error;
  }
}

// query message {
//     messages(
//       filter: {and: {typeUrl: {equalTo: "/ixo.token.v1beta1.MsgRetireToken"},
//        tokenNames: {contains: "CARBON"},
//         transactionByTransactionHash: {and: {code: {equalTo: 0},
//          time: {greaterThanOrEqualTo: "${dateGreaterThanOrEqual}",
//          lessThanOrEqualTo: "${dateLessThanOrEqual}"}}},
//          from: {equalTo: "${ownerAddress}"}}}
//     ) {
//       totalCount
//       nodes {
//         value
//       }
//     }
//   }

const QUERY_CARBON_RETIRE_MESSAGES = `
  query queryCarbonRetireMessages($ownerAddress: String!, $startDate: Datetime!, $endDate: Datetime!) {
    messages(
      filter: {
        and: {
          typeUrl: { equalTo: "/ixo.token.v1beta1.MsgRetireToken" }
          tokenNames: { contains: "CARBON" }
          transactionByTransactionHash: {
            and: {
              code: { equalTo: 0 }
              time: { greaterThanOrEqualTo: $startDate, lessThanOrEqualTo: $endDate }
            }
          }
          from: { equalTo: $ownerAddress }
        }
      }
    ) {
      totalCount
      nodes {
        value
      }
    }
  }
`;

export async function queryCarbonRetireMessages(
  network: ChainNetwork,
  ownerAddress: string,
  startDate: string,
  endDate: string,
): Promise<
  Array<{
    value: string;
  }>
> {
  try {
    const startDateTime = new Date(
      Date.UTC(
        new Date(startDate).getUTCFullYear(),
        new Date(startDate).getUTCMonth(),
        new Date(startDate).getUTCDate(),
        0,
        0,
        0,
      ),
    ).toISOString();
    const endDateTime = new Date(
      Date.UTC(
        new Date(endDate).getUTCFullYear(),
        new Date(endDate).getUTCMonth(),
        new Date(endDate).getUTCDate(),
        23,
        59,
        59,
      ),
    ).toISOString();

    const url = BLOCKSYNC_GRAPHQL_URLS[network];
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY_CARBON_RETIRE_MESSAGES,
        variables: { ownerAddress, startDate: startDateTime, endDate: endDateTime },
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data?.data?.messages?.nodes;
  } catch (error) {
    console.error('Error fetching carbon retire messages:', error);
    throw error;
  }
}
