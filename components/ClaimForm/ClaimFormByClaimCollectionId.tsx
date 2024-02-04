import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

import { queryClaimCollectionById } from '@utils/graphql';
import ClaimFormByProtocolId from './ClaimFormByProtocolId';
import LoaderMessage from '@components/LoaderMessage/LoaderMessage';
import IconText from '@components/IconText/IconText';
import { ChainNetwork } from 'types/chain';

type ClaimFormByClaimCollectionIdProps = {
  claimCollectionId: string;
  network: ChainNetwork;
};

const ClaimFormByClaimCollectionId: NextPage<ClaimFormByClaimCollectionIdProps> = ({ claimCollectionId, network }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined); // TODO: render error
  const [protocolId, setProtocolId] = useState<string | undefined>(undefined);

  const fetchClaimCollection = useRef<boolean>(true);

  useEffect(() => {
    if (claimCollectionId && network && fetchClaimCollection.current) {
      fetchClaimCollection.current = false;
      setLoading(true);
      (async () => {
        try {
          const claimCollection = await queryClaimCollectionById(network, claimCollectionId as string);
          if (!claimCollection?.protocol) throw new Error('Unable to fetch claim collection');
          setProtocolId(claimCollection.protocol);
        } catch (error) {
          console.error('Failed to fetch claim collection', error);
          setError((error as { message: string }).message as string);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [claimCollectionId, network]);

  if (loading) return <LoaderMessage message='Fetching claim collection...' />;

  if (error) return <IconText title='Something went wrong' subTitle={error} imgSize={50} />;

  if (!protocolId)
    return <IconText title='Something went wrong' subTitle='Unable to fetch claim collection' imgSize={50} />;

  return <ClaimFormByProtocolId protocolId={protocolId} network={network} />;
};

export default ClaimFormByClaimCollectionId;
