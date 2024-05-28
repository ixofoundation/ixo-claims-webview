import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import 'survey-core/themes/borderless-dark';

import LoaderMessage from '@components/LoaderMessage/LoaderMessage';
import IconText from '@components/IconText/IconText';
import { themeJson } from '@constants/surveyTheme';
import { ChainNetwork } from 'types/chain';
import { queryClaimCollectionsByEntityAndProtocols, queryEntitiesByRelayerNode } from '@utils/graphql';
import {
  DEVNET_OFFSET_DAO_ENTITY_ID,
  MAINNET_OFFSET_DAO_ENTITY_ID,
  TESTNET_OFFSET_DAO_ENTITY_ID,
} from '@utils/secrets';
import SelectStartAndEndDate from '@components/SelectStartAndEndDate/SelectStartAndEndDate';

type ClaimFormProps = {
  surveyTemplate: any;
  network: ChainNetwork;
  claimCollectionId?: string;
  address?: string;
  did?: string;
};

const ClaimForm: NextPage<ClaimFormProps> = ({ surveyTemplate, network, claimCollectionId, address, did }) => {
  const [surveyLoading, setSurveyLoading] = useState<boolean | undefined>(true);
  const [claimProtocolLoading, setClaimProtocolLoading] = useState<boolean | undefined>(true);
  const [surveyIsOffsetClaim, setSurveyIsOffsetClaim] = useState<boolean | undefined>(false);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [offsetTokens, setOffsetTokens] = useState<number | undefined>(undefined);
  const [collectionBranding, setCollectionBranding] = useState<string | undefined>(undefined);
  const [collectionName, setCollectionName] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState<boolean | undefined>(false);

  const claimProtocolLoadingRef = useRef<boolean>(false);

  useEffect(
    function () {
      if (!claimCollectionId) {
        setClaimProtocolLoading(false);
      } else {
        (async function () {
          if (claimProtocolLoadingRef.current) return;
          claimProtocolLoadingRef.current = true;
          try {
            setClaimProtocolLoading(true);
            const offsetDaoEntityId =
              network === ChainNetwork.Mainnet
                ? MAINNET_OFFSET_DAO_ENTITY_ID
                : network === ChainNetwork.Testnet
                ? TESTNET_OFFSET_DAO_ENTITY_ID
                : network === ChainNetwork.Devnet
                ? DEVNET_OFFSET_DAO_ENTITY_ID
                : undefined;
            if (!offsetDaoEntityId) {
              throw new Error('Invalid network');
            }
            const entities = await queryEntitiesByRelayerNode(network, offsetDaoEntityId);
            if (!entities?.length) {
              return;
            }
            const entityIds = entities
              .map(function (entity) {
                return entity.id;
              })
              .filter(function (id) {
                return !!id;
              });
            if (!entityIds.length) {
              return;
            }
            const claimCollections = await queryClaimCollectionsByEntityAndProtocols(
              network,
              offsetDaoEntityId,
              entityIds,
            );
            if (!claimCollections?.length) {
              return;
            }
            const offsetClaimCollections = claimCollections
              .map(function (claimCollection) {
                return claimCollection.id;
              })
              .filter(function (id) {
                return !!id;
              });
            if (offsetClaimCollections?.length && offsetClaimCollections.includes(claimCollectionId)) {
              setSurveyIsOffsetClaim(true);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setClaimProtocolLoading(false);
            claimProtocolLoadingRef.current = false;
          }
        })();
      }
    },
    [claimCollectionId, network],
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
          numberOfCreditsProduced: offsetTokens ?? 0,
        };
        if (did) {
          surveyData.claimantWallet = did;
        }
        if (collectionBranding) {
          surveyData.collectionBranding = collectionBranding;
        }
        if (collectionName) {
          surveyData.collectionName = collectionName;
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

  function handleContinue(
    startDate: string,
    endDate: string,
    offsetTokens: number,
    collectionBranding?: string,
    collectionName?: string,
  ) {
    if (collectionBranding) {
      setCollectionBranding(collectionBranding);
    }
    if (collectionName) {
      setCollectionName(collectionName);
    }
    setStartDate(startDate);
    setEndDate(endDate);
    setOffsetTokens(offsetTokens);
  }

  if (surveyLoading || claimProtocolLoading) return <LoaderMessage message='Rendering claim form...' />;

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
