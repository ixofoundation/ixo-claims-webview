import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';

import ClaimForm from './ClaimForm';
import LoaderMessage from '@components/LoaderMessage/LoaderMessage';
import IconText from '@components/IconText/IconText';
import { ChainNetwork } from 'types/chain';

type ClaimFormByImpactsXProps = {
  network: ChainNetwork;
};

const ClaimFormByImpactsX: NextPage<ClaimFormByImpactsXProps> = ({ network }) => {
  const [loading, setLoading] = useState<boolean | undefined>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [surveyTemplate, setSurveyTemplate] = useState<any[]>([]);

  const fetchSurvey = useRef<boolean>(true);

  useEffect(() => {
    if (fetchSurvey.current) {
      fetchSurvey.current = false;
      (async () => {
        try {
          if (!(window as any)?.impactX?.claim?.fetch) throw new Error('Unable to fetch claim from Impacts X');
          const survey = await (window as any).impactsX.claim.fetch();
          if (!survey) throw new Error('Unable to fetch claim form from Impacts X');
          setSurveyTemplate(survey.question);
        } catch (error) {
          console.error('Failed to fetch survey template', error);
          setError((error as { message: string }).message as string);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  if (loading) return <LoaderMessage message='Fetching claim form...' />;

  if (error) return <IconText title='Something went wrong' subTitle={error} imgSize={50} />;

  if (!surveyTemplate)
    return (
      <IconText
        title='Something went wrong'
        subTitle='Unable to fetch claim form template from Impacts X'
        imgSize={50}
      />
    );

  return <ClaimForm surveyTemplate={surveyTemplate} network={network} />;
};

export default ClaimFormByImpactsX;
