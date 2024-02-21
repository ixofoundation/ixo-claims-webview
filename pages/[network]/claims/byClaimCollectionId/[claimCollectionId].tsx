import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import styles from '@styles/stepsPages.module.scss';
import Head from '@components/Head/Head';
import ClaimFormByClaimCollectionId from '@components/ClaimForm/ClaimFormByClaimCollectionId';
import { ChainNetwork } from 'types/chain';

const ClaimFormByClaimCollectionIdPage: NextPage<{}> = () => {
  const [headTitle, setHeadTitle] = useState<string>('Claim Form');
  const [headDescription, setHeadDescription] = useState<string>('Submit a Claim');

  const { query } = useRouter();

  return (
    <>
      <Head title={headTitle} description={headDescription} />

      <ClaimFormByClaimCollectionId
        claimCollectionId={query.claimCollectionId as string}
        network={query.network as ChainNetwork}
      />
    </>
  );
};

export default ClaimFormByClaimCollectionIdPage;
