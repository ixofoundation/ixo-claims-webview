import { useState, useMemo, useCallback } from 'react';
import type { NextPage } from 'next';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import 'survey-core/themes/borderless-dark';

import LoaderMessage from '@components/LoaderMessage/LoaderMessage';
import IconText from '@components/IconText/IconText';
import { themeJson } from '@constants/surveyTheme';
import { ChainNetwork } from 'types/chain';

type ClaimFormProps = {
  surveyTemplate: any;
  network: ChainNetwork;
};

const ClaimForm: NextPage<ClaimFormProps> = ({ surveyTemplate }) => {
  const [loading, setLoading] = useState<boolean | undefined>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState<boolean | undefined>(false);

  const handleSubmit = useCallback(async (answer: any) => {
    setSubmitting(true);
    try {
      const impactsXClaims = ((window as any)?.impactsX as any)?.claim;

      if (!impactsXClaims) throw new Error('Unable to submit claim to Impacts X');

      impactsXClaims.submit(JSON.stringify(answer));
      return true;
    } catch (e: any) {
      console.error(e);
      setError('Failed to submit claim. ' + typeof e === 'string' ? e : e.message);
      setSubmitting(false);
      return false;
    }
  }, []);

  const survey = useMemo(() => {
    if (!surveyTemplate) return undefined;

    const survey = new Model(surveyTemplate);
    survey.applyTheme(themeJson);
    survey.allowCompleteSurveyAutomatic = false;

    function preventComplete(sender: any, options: any) {
      options.allowComplete = false;
      postResults(sender);
    }

    async function postResults(sender: any) {
      survey.onCompleting.remove(preventComplete);

      survey.completeText = 'Submitting...';
      const response = await handleSubmit(sender.data);
      if (response) {
        sender.doComplete();
      } else {
        survey.completeText = 'Try again';
        survey.onCompleting.add(preventComplete);
      }
    }

    survey.onCompleting.add(preventComplete);
    survey.completeText = 'Submit';
    setTimeout(() => setLoading(false), 100);
    return survey;
  }, [surveyTemplate]);

  if (loading) return <LoaderMessage message='Rendering claim form...' />;

  if (error) return <IconText title='Something went wrong' subTitle={error} imgSize={50} />;

  if (submitting) return <LoaderMessage message='Submitting claim...' />;

  if (!surveyTemplate)
    return <IconText title='Something went wrong' subTitle='Unable to render claim survey' imgSize={50} />;

  if (!survey) return <IconText title='Something went wrong' subTitle='Unable to render claim survey' imgSize={50} />;

  return <Survey model={survey} />;
};

export default ClaimForm;
