import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

import { queryEntityById } from '@utils/graphql';
import { Entity, EntityLinkedResource } from 'types/entity';
import { serviceEndpointToUrl } from '@utils/api';
import ClaimFormBySurveyUrl from '@components/ClaimForm/ClaimFormBySurveyUrl';
import LoaderMessage from '@components/LoaderMessage/LoaderMessage';
import IconText from '@components/IconText/IconText';
import { ChainNetwork } from 'types/chain';

type ClaimFormByProtocolIdProps = {
  protocolId: string;
  network: ChainNetwork;
};

const ClaimFormByProtocolId: NextPage<ClaimFormByProtocolIdProps> = ({ protocolId, network }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [surveyUrl, setSurveyUrl] = useState<string | undefined>(undefined);

  const fetchProtocol = useRef<boolean>(true);

  useEffect(() => {
    if (protocolId && network && fetchProtocol.current) {
      fetchProtocol.current = false;
      setLoading(true);
      (async () => {
        try {
          const protocolEntity = await queryEntityById(network, protocolId as string);
          if (!protocolEntity) throw new Error('Unable to fetch claim protocol');
          console.log('protocolEntity', protocolEntity.type);
          if (
            protocolEntity.type !== 'protocol' &&
            protocolEntity.type !== 'deed' &&
            protocolEntity.type !== 'protocol/deed' &&
            protocolEntity.type !== 'protocol/claim'
          )
            throw new Error('Invalid protocol id');
          const claimSchemaLinkedResource: undefined | EntityLinkedResource = (
            protocolEntity as Entity
          ).linkedResource?.find((linkedResource) => linkedResource.type?.includes('survey'));
          if (!claimSchemaLinkedResource) throw new Error('Unable to identify claim survey');
          const url = serviceEndpointToUrl(
            claimSchemaLinkedResource.serviceEndpoint!,
            (protocolEntity as Entity).service!,
          );
          setSurveyUrl(url);
        } catch (error) {
          console.error('Failed to fetch protocol entity', error);
          setError((error as { message: string }).message as string);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [protocolId, network]);

  if (loading) return <LoaderMessage message='Fetching claim protocol...' />;

  if (error) return <IconText title='Something went wrong' subTitle={error} imgSize={50} />;

  if (!surveyUrl)
    return <IconText title='Something went wrong' subTitle='Unable to fetch claim protocol' imgSize={50} />;

  return <ClaimFormBySurveyUrl surveyUrl={surveyUrl} network={network} />;
};

export default ClaimFormByProtocolId;
