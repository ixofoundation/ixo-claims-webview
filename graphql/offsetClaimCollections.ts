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
