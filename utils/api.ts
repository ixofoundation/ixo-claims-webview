import { EntityNodeType, EntityService } from 'types/entity';

export function serviceEndpointToUrl(serviceEndpoint: string, service: EntityService[]): string {
  if (service.length === 0) {
    return serviceEndpoint;
  }
  let url = '';
  const [identifier, key] = serviceEndpoint.replace('{id}#', '').split(':');
  const usedService: EntityService | undefined = service.find(
    (item: any) => item.id.replace('{id}#', '') === identifier.replace('{id}#', ''),
  );

  if (
    usedService &&
    (usedService as EntityService).type?.toLocaleLowerCase() === EntityNodeType.Ipfs.toLocaleLowerCase()
  ) {
    url = `https://${key}.ipfs.w3s.link`;
  } else if (
    usedService &&
    (usedService as EntityService).type?.toLocaleLowerCase() === EntityNodeType.CellNode.toLocaleLowerCase()
  ) {
    url = new URL(key, usedService.serviceEndpoint).href;
  } else {
    url = serviceEndpoint;
  }
  return url;
}
