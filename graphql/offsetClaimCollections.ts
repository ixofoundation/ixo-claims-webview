import { ChainNetwork } from 'types/chain';
import gqlQuery from '@utils/gql';
import {
  DEVNET_OFFSET_DAO_ENTITY_ID,
  MAINNET_OFFSET_DAO_ENTITY_ID,
  TESTNET_OFFSET_DAO_ENTITY_ID,
} from '@utils/secrets';

export async function fetchOffsetClaimCollections(network: ChainNetwork) {
  try {
    const offsetDaoEntityId =
      network === ChainNetwork.Mainnet
        ? MAINNET_OFFSET_DAO_ENTITY_ID
        : network === ChainNetwork.Testnet
        ? TESTNET_OFFSET_DAO_ENTITY_ID
        : network === ChainNetwork.Devnet
        ? DEVNET_OFFSET_DAO_ENTITY_ID
        : undefined;
    if (!offsetDaoEntityId) {
      throw new Error('Invalid network');
    }
    const currentDateTime = new Date(Date.now()).toISOString();
    const protocolClaimEntitiesQuery = `
      entities(
        filter: {
          and: {
            type: { equalTo: "protocol/claim" }
            relayerNode: { equalTo: "${offsetDaoEntityId}" }
            startDate: { lessThan: "${currentDateTime}" }
            endDate: { greaterThan: "${currentDateTime}" }
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
    `;
    const { data: protocolClaimEntitiesData, error: protocolClaimEntitiesError } = await gqlQuery<{
      data: {
        entities: {
          totalCount: number;
          nodes: {
            id: string;
          }[];
        };
      };
    }>(network, protocolClaimEntitiesQuery);
    if (protocolClaimEntitiesError) {
      throw protocolClaimEntitiesError;
    }
    const protocolClaimEntityIds = protocolClaimEntitiesData?.data?.entities?.nodes
      .map(function (node) {
        return node.id;
      })
      .filter(function (id) {
        return !!id;
      });
    if (!protocolClaimEntityIds?.length) {
      throw new Error('No protocol claim entities found');
    }
    const protocolClaimCollectionsQuery = `
      claimCollections(filter: {
        and: {
          entity: { equalTo: "${offsetDaoEntityId}" }
          startDate: { lessThan: "${currentDateTime}" }
          endDate: { greaterThan: "${currentDateTime}" }
          protocol: { in: ["${protocolClaimEntityIds.join('", "')}"] }
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
    `;
    const { data: protocolClaimCollectionsData, error: protocolClaimCollectionsError } = await gqlQuery<{
      data: {
        claimCollections: {
          totalCount: number;
          nodes: {
            id: string;
            quota: number;
            count: number;
          }[];
        };
      };
    }>(network, protocolClaimCollectionsQuery);
    if (protocolClaimCollectionsError) {
      throw protocolClaimCollectionsError;
    }
    const protocolClaimCollections = protocolClaimCollectionsData?.data?.claimCollections?.nodes;
    if (!protocolClaimCollections?.length) {
      throw new Error('No protocol claim collections found');
    }
    const offsetClaimCollectionIds = protocolClaimCollections
      .map(function (node) {
        if (node.quota && node.count > node.quota) {
          return undefined;
        }
        return node.id;
      })
      .filter(function (id) {
        return !!id;
      });
    if (!offsetClaimCollectionIds?.length) {
      throw new Error('No offset claim collections found');
    }
    return offsetClaimCollectionIds;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// query MyQuery {
//   entity(id: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb") {
//     endDate
//     id
//     startDate
//     status
//     type
//   }
//   claimCollections(filter: {
//   	and: {
//       entity: {equalTo: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb"}
//       startDate: { lessThan: "2024-05-28" }
//       endDate: { greaterThan: "2024-05-28" }
//     }
//   }) {
//     totalCount
//     nodes {
//       id
//       state
//       entity
//       startDate
//       endDate
//       protocol
//       admin
//       quota
//       count
//     }
//   }
//   entities(
//     filter: {
//       and: {
//         type: {equalTo: "protocol/claim"}
//         relayerNode: { equalTo: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb" }
//         startDate: { lessThan: "2024-05-28" }
//         endDate: { greaterThan: "2024-05-28" }
//         entityVerified: {equalTo: true}
//     	}
//     }
//   ) {
//     totalCount
//     nodes {
//       id
//       type
//       metadata
//       accounts
//       owner
//       context
//       service
//       linkedResource
//       settings
//       alsoKnownAs
//       externalId
//     }
//   }
//   protocolCliamCollections: claimCollections(filter: {
//   	and: {
//       entity: {equalTo: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb"}
//       startDate: { lessThan: "2024-05-28" }
//       endDate: { greaterThan: "2024-05-28" }
//       protocol: { in: ["did:ixo:entity:5026498946ba6bbc1dd6fc0ed869f9fb", "did:ixo:entity:d3678f369babb25a6021992623b04e0e"] }
//     }
//   }) {
//     totalCount
//     nodes {
//       id
//       state
//       entity
//       startDate
//       endDate
//       protocol
//       admin
//       quota
//       count
//     }
//   }
//   protocolClaimCollectionsEntity: entity(id: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb") {
//     settings
//     service
//   }
// }

// =========================================================================

// query MyQuery {
//   entity(id: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb") {
//     endDate
//     id
//     startDate
//     status
//     type
//   }
//   claimCollections(filter: {
//   	and: {
//       entity: {equalTo: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb"}
//       startDate: { lessThan: "2024-05-28" }
//       endDate: { greaterThan: "2024-05-28" }
//     }
//   }) {
//     totalCount
//     nodes {
//       id
//       state
//       entity
//       startDate
//       endDate
//       protocol
//       admin
//       quota
//       count
//     }
//   }
//   entities(
//     filter: {
//       and: {
//         type: {equalTo: "protocol/claim"}
//         relayerNode: { equalTo: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb" }
//         startDate: { lessThan: "2024-05-28" }
//         endDate: { greaterThan: "2024-05-28" }
//         entityVerified: {equalTo: true}
//         status: {equalTo: 0}
//     	}
//     }
//   ) {
//     totalCount
//     nodes {
//       id
//       type
//       metadata
//       accounts
//       owner
//       context
//       service
//       linkedResource
//       settings
//       alsoKnownAs
//       externalId
//     }
//   }
// protocolCliamCollections: claimCollections(filter: {
//   and: {
//     entity: {equalTo: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb"}
//     startDate: { lessThan: "2024-05-28" }
//     endDate: { greaterThan: "2024-05-28" }
//     protocol: { in: ["did:ixo:entity:5026498946ba6bbc1dd6fc0ed869f9fb", "did:ixo:entity:d3678f369babb25a6021992623b04e0e"] }
//   }
// }) {
//   totalCount
//   nodes {
//     id
//     state
//     entity
//     startDate
//     endDate
//     protocol
//     admin
//     quota
//     count
//   }
// }
//   protocolClaimCollectionsEntity: entity(id: "did:ixo:entity:3d079ebc0b332aad3305bb4a51c72edb") {
//     settings
//     service
//   }
// }
