import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import ClaimFormByProtocolId from '@components/ClaimForm/ClaimFormByProtocolId';
import Head from '@components/Head/Head';
import { ChainNetwork } from 'types/chain';

const ClaimFormByProtocolIdPage: NextPage<{}> = () => {
  const { query } = useRouter();

  return (
    <>
      <Head title={'Claim Form'} description={'Submit a Claim'} />

      <ClaimFormByProtocolId
        protocolId={query.protocolId as string}
        network={query.network as ChainNetwork}
        address={query.address as string}
        did={query.did as string}
      />
    </>
  );
};

export default ClaimFormByProtocolIdPage;
