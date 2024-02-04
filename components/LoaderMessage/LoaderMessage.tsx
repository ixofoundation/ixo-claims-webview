import React, { FC } from 'react';

import utilsStyles from '@styles/utils.module.scss';
import Loader from '@components/Loader/Loader';

type LoaderMessageProps = {
  message?: string;
};

const LoaderMessage: FC<LoaderMessageProps> = ({ message }) => {
  return (
    <>
      <Loader size={30} />
      <div className={utilsStyles.spacer3} />
      {message}
    </>
  );
};

export default LoaderMessage;
