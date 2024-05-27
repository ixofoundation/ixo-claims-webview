import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import ClaimFormByClaimCollectionId from '@components/ClaimForm/ClaimFormByClaimCollectionId';
import Head from '@components/Head/Head';
import { ChainNetwork } from 'types/chain';

const ClaimFormByClaimCollectionIdPage: NextPage<{}> = () => {
  const { query } = useRouter();

  return (
    <>
      <Head title={'Claim Form'} description={'Submit a Claim'} />

      <ClaimFormByClaimCollectionId
        claimCollectionId={query.claimCollectionId as string}
        network={query.network as ChainNetwork}
      />
    </>
  );
};

export default ClaimFormByClaimCollectionIdPage;
