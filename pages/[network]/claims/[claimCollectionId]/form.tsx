import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import ClaimFormByImpactsX from '@components/ClaimForm/ClaimFormByImpactsX';
import Head from '@components/Head/Head';
import { ChainNetwork } from 'types/chain';

const ClaimFormByImpactsXPage: NextPage<{}> = () => {
  const { query } = useRouter();

  return (
    <>
      <Head title={'Claim Form'} description={'Submit a Claim'} />

      <ClaimFormByImpactsX
        network={query.network as ChainNetwork}
        claimCollectionId={query.claimCollectionId as string}
        address={query.address as string}
        did={query.did as string}
      />
    </>
  );
};

export default ClaimFormByImpactsXPage;
