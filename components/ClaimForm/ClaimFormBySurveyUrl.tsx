import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

import ClaimForm from './ClaimForm';
import LoaderMessage from '@components/LoaderMessage/LoaderMessage';
import IconText from '@components/IconText/IconText';
import { ChainNetwork } from 'types/chain';

type ClaimFormBySurveyUrlProps = {
  surveyUrl: string;
  network: ChainNetwork;
  claimCollectionId?: string;
  address?: string;
  did?: string;
};

const ClaimFormBySurveyUrl: NextPage<ClaimFormBySurveyUrlProps> = ({
  surveyUrl,
  network,
  claimCollectionId,
  address,
  did,
}) => {
  const [loading, setLoading] = useState<boolean | undefined>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [surveyTemplate, setSurveyTemplate] = useState<any[]>([]);

  const fetchSurvey = useRef<boolean>(true);

  useEffect(() => {
    if (surveyUrl && fetchSurvey.current) {
      fetchSurvey.current = false;
      (async () => {
        try {
          if (!surveyUrl) throw new Error('Unable to find claim survey');
          const response = await fetch(surveyUrl);
          const survey = await response.json();
          if (!survey) throw new Error('Unable to fetch claim survey');
          setSurveyTemplate(survey.question);
        } catch (error) {
          console.error('Failed to fetch survey template', error);
          setError((error as { message: string }).message as string);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [surveyUrl]);

  if (loading) return <LoaderMessage message='Fetching claim template...' />;

  if (error) return <IconText title='Something went wrong' subTitle={error} imgSize={50} />;

  if (!surveyTemplate)
    return <IconText title='Something went wrong' subTitle='Unable to fetch claim template' imgSize={50} />;

  return (
    <ClaimForm
      claimCollectionId={claimCollectionId}
      surveyTemplate={surveyTemplate}
      network={network}
      address={address}
      did={did}
    />
  );
};

export default ClaimFormBySurveyUrl;
