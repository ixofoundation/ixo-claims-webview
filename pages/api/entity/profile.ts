import { queryEntityById } from '@utils/graphql';
import {
  DEVNET_OFFSET_DAO_ENTITY_ID,
  MAINNET_OFFSET_DAO_ENTITY_ID,
  TESTNET_OFFSET_DAO_ENTITY_ID,
} from '@utils/secrets';
import { NextApiRequest, NextApiResponse } from 'next';
import { ChainNetwork } from 'types/chain';

export default async function getEntityProfile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { network } = req.query;
    const offsetDaoEntityId =
      network === ChainNetwork.Mainnet
        ? MAINNET_OFFSET_DAO_ENTITY_ID
        : network === ChainNetwork.Testnet
        ? TESTNET_OFFSET_DAO_ENTITY_ID
        : network === ChainNetwork.Devnet
        ? DEVNET_OFFSET_DAO_ENTITY_ID
        : undefined;
    if (!offsetDaoEntityId) {
      throw new Error('Cannot determine entity id');
    }
    const entity = await queryEntityById(network as ChainNetwork, offsetDaoEntityId);
    if (!entity) {
      throw new Error('Unable to fetch offset dao entity');
    }
    const { settings, service } = entity;
    // @ts-ignore
    const profileSettings = settings?.Profile;
    if (!profileSettings) {
      throw new Error('Profile settings not found');
    }
    let url = profileSettings.serviceEndpoint;
    if (!url.includes('http')) {
      // @ts-ignore
      const profileSettingsService = service?.find((service) =>
        service?.id?.includes(profileSettings?.serviceEndpoint?.split(':')?.[0]),
      );
      if (!profileSettingsService) {
        throw new Error('Profile settings service not found');
      }
      let profileUrl = new URL(profileSettingsService.serviceEndpoint);
      profileUrl.pathname = profileSettings.serviceEndpoint.replace(profileSettings.split(':')?.[0], '');
      url = profileUrl.toString();
    }
    if (!url) {
      throw new Error('Invalid profile settings service endpoint');
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
