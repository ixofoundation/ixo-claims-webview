export enum EntityNodeType {
  CellNode = 'CellNode', //  cellnode
  CellNodeEncrypted = 'CellNodeEncrypted', //  cellnode-encrypted
  BlockchainRPC = 'Blockchain', //  blockchain
  WebService = 'WebService', //  webservice
  BotService = 'BotService', //  bot-service
  AuthenticationService = 'AuthenticationService', //  authentication
  CloudWorker = 'CloudWorker', //  cloudworker
  Ipfs = 'Ipfs', //  ipfs
  CredentialRegistry = 'CredentialRegistry', //  credential-registry
}

export type EntityContext = {
  key?: string;
  val?: string;
};

export type EntityMetaData = {
  versionId?: string;
  created?: string;
  updated?: string;
  deactivated?: boolean;
};

export type EntityVerificationMethod = {
  id?: string;
  type?: string;
  controller?: string;
  blockchainAccountId?: string;
  publicKeyHex?: string;
  publicKeyMultibase?: string;
  publicKeyBase58?: string;
};

export type EntityService = {
  id?: string;
  type?: string;
  serviceEndpoint?: string;
};

export type EntityAccordedRight = {
  id?: string;
  type?: string;
  mechanism?: string;
  message?: string;
  service?: string;
};

export type EntityLinkedResource = {
  id?: string;
  type?: string;
  description?: string;
  mediaType?: string;
  serviceEndpoint?: string;
  proof?: string;
  encrypted?: string;
  right?: string;
};

export type EntityLinkedEntity = {
  id?: string;
  type?: string;
  relationship?: string;
  service?: string;
};

export type EntityAccount = {
  name?: string;
  address?: string;
};

export type Entity = {
  accordedRight?: EntityAccordedRight[];
  accounts?: EntityAccount[];
  alsoKnownAs?: string;
  assertionMethod?: string[];
  authentication?: string[];
  capabilityDelegation?: string[];
  capabilityInvocation?: string[];
  context?: (EntityContext | string)[];
  controller?: string[];
  credentials?: string[];
  dao?: string;
  daoProfile?: string;
  endDate?: string;
  entityVerified?: boolean;
  id: string;
  keyAgreement?: string[];
  linkedEntity?: EntityLinkedEntity[];
  linkedResource?: EntityLinkedResource[];
  metadata?: EntityMetaData;
  page?: string;
  profile?: string;
  relayerNode?: string;
  owner?: string;
  service?: EntityService[];
  settings?: any;
  startDate?: string;
  status?: number;
  tags?: string;
  token?: string;
  type?: string;
  verificationMethod?: EntityVerificationMethod[];
  zlottie?: string;
};
