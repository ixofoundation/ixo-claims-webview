import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Head from '@components/Head/Head';
import { ChainNetwork } from 'types/chain';
import ClaimFormByImpactsX from '@components/ClaimForm/ClaimFormByImpactsX';

const ClaimFormByImpactsXPage: NextPage<{}> = () => {
  const { query } = useRouter();

  return (
    <>
      <Head title={'Claim Form'} description={'Submit a Claim'} />

      <ClaimFormByImpactsX network={query.network as ChainNetwork} />
    </>
  );
};

export default ClaimFormByImpactsXPage;
