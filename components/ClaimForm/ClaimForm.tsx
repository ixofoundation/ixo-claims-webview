import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import 'survey-core/themes/borderless-dark';

import LoaderMessage from '@components/LoaderMessage/LoaderMessage';
import SelectStartAndEndDate from '@components/SelectStartAndEndDate/SelectStartAndEndDate';
import IconText from '@components/IconText/IconText';
import { themeJson } from '@constants/surveyTheme';
import { ChainNetwork } from 'types/chain';
import {
  DEVNET_OFFSET_CLAIM_COLLECTION_IDS,
  MAINNET_OFFSET_CLAIM_COLLECTION_IDS,
  TESTNET_OFFSET_CLAIM_COLLECTION_IDS,
} from '@utils/secrets';

type ClaimFormProps = {
  surveyTemplate: any;
  network: ChainNetwork;
  claimCollectionId?: string;
  address?: string;
  did?: string;
};

const ClaimForm: NextPage<ClaimFormProps> = ({ surveyTemplate, network, claimCollectionId, address, did }) => {
  const [surveyLoading, setSurveyLoading] = useState<boolean | undefined>(true);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [offsetTokens, setOffsetTokens] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState<boolean | undefined>(false);

  const surveyIsOffsetClaim = useMemo(
    function () {
      const offsetClaimCollections =
        network === ChainNetwork.Mainnet
          ? MAINNET_OFFSET_CLAIM_COLLECTION_IDS
          : network === ChainNetwork.Testnet
          ? TESTNET_OFFSET_CLAIM_COLLECTION_IDS
          : network === ChainNetwork.Devnet
          ? DEVNET_OFFSET_CLAIM_COLLECTION_IDS
          : [];
      return offsetClaimCollections.includes(claimCollectionId ?? '');
    },
    [network, claimCollectionId],
  );

  const handleSubmit = useCallback(async function (answer: any) {
    setSubmitting(true);
    try {
      const impactsXClaims = ((window as any)?.impactsX as any)?.claim;

      if (!impactsXClaims) {
        throw new Error('Unable to submit claim to Impacts X');
      }

      impactsXClaims.submit(JSON.stringify(answer));
      return true;
    } catch (e: any) {
      console.error(e);
      setError('Failed to submit claim. ' + typeof e === 'string' ? e : e.message);
      setSubmitting(false);
      return false;
    }
  }, []);

  const survey = useMemo(
    function () {
      if (!surveyTemplate) {
        return undefined;
      }

      const survey = new Model(surveyTemplate);
      survey.applyTheme(themeJson);
      survey.allowCompleteSurveyAutomatic = false;
      if (surveyIsOffsetClaim) {
        const surveyData: Record<string, any> = {
          startDate: startDate?.split('T')?.[0],
          endDate: endDate?.split('T')?.[0],
          amountOffset: offsetTokens ?? 0,
        };
        if (did) {
          surveyData.claimantWallet = did;
        }
        survey.data = surveyData;
      }

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

      setTimeout(() => setSurveyLoading(false), 100);
      return survey;
    },
    [surveyTemplate, surveyIsOffsetClaim, did, startDate, endDate, offsetTokens],
  );

  function handleContinue(startDate: string, endDate: string, offsetTokens: number) {
    setStartDate(startDate);
    setEndDate(endDate);
    setOffsetTokens(offsetTokens);
  }

  if (surveyLoading) return <LoaderMessage message='Rendering claim form...' />;

  if (error) return <IconText title='Something went wrong' subTitle={error} imgSize={50} />;

  if (submitting) return <LoaderMessage message='Submitting claim...' />;

  if (!surveyTemplate)
    return <IconText title='Something went wrong' subTitle='Unable to render claim survey' imgSize={50} />;

  if (!survey) return <IconText title='Something went wrong' subTitle='Unable to render claim survey' imgSize={50} />;

  if (surveyIsOffsetClaim && network && address && typeof offsetTokens !== 'number')
    return (
      <SelectStartAndEndDate
        claimCollectionId={claimCollectionId}
        network={network}
        address={address!}
        onContinue={handleContinue}
      />
    );

  return <Survey model={survey} />;
};

export default ClaimForm;
