import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import styles from '@styles/stepsPages.module.scss';
import Head from '@components/Head/Head';
import { ChainNetwork } from 'types/chain';
import ClaimFormByProtocolId from '@components/ClaimForm/ClaimFormByProtocolId';

const ClaimFormByProtocolIdPage: NextPage<{}> = () => {
  const [headTitle, setHeadTitle] = useState<string>('Claim Form');
  const [headDescription, setHeadDescription] = useState<string>('Submit a Claim');

  const { query } = useRouter();

  return (
    <>
      <Head title={headTitle} description={headDescription} />

      <main className={cls(utilsStyles.main, utilsStyles.columnJustifyCenter, styles.stepContainer)}>
        {<ClaimFormByProtocolId protocolId={query.protocolId as string} network={query.network as ChainNetwork} />}
      </main>
    </>
  );
};

export default ClaimFormByProtocolIdPage;
