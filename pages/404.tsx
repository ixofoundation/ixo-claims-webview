import type { NextPage } from 'next';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import styles from '@styles/aboutPage.module.scss';
import Header from '@components/Header/Header';
import Head from '@components/Head/Head';
import ExclaimCircled from '@icons/exclaim_circled.svg';
import ColoredIcon, { ICON_COLOR } from '@components/ColoredIcon/ColoredIcon';

const Page404: NextPage = () => {
  return (
    <>
      <Head title='404 Not Found' description='404 Not Found' />

      <Header />

      <main className={cls(utilsStyles.main, utilsStyles.columnJustifyAlignCenter)}>
        <div className={utilsStyles.spacer3} />
        <ColoredIcon size={100} icon={ExclaimCircled} color={ICON_COLOR.error} />
        <ExclaimCircled />
        <p className={styles.notFound}>Error 404</p>
        <p className={styles.notFound}>We can&apos;t find the page you are looking for.</p>
        <div className={utilsStyles.spacer3} />
      </main>
    </>
  );
};

export default Page404;
