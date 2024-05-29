import { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next';
import cls from 'classnames';

import utilsStyles from '@styles/utils.module.scss';
import Card, { CARD_BG_COLOR, CARD_SIZE } from '@components/Card/Card';
import Button, { BUTTON_BG_COLOR, BUTTON_BORDER_COLOR, BUTTON_COLOR, BUTTON_SIZE } from '@components/Button/Button';
import { getCSSVariable } from '@utils/styles';
import { queryCarbonRetireMessages } from '@utils/graphql';
import { ChainNetwork } from 'types/chain';

type SelectStartAndEndDateProps = {
  network: ChainNetwork;
  address: string;
  claimCollectionId?: string;
  onContinue: (
    startDate: string,
    endDate: string,
    impactTokens: number,
    collectionBranding?: string,
    collectionName?: string,
  ) => void;
};

const SelectStartAndEndDate: NextPage<SelectStartAndEndDateProps> = ({
  network,
  address,
  claimCollectionId,
  onContinue,
}) => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const todayRef = useRef<string>(new Date().toISOString().split('T')[0]);

  async function handleContinuePress() {
    try {
      if (!startDate || !endDate) return;
      let impactTokens = 0;
      const carbonOffsetMessages = await queryCarbonRetireMessages(network, address, startDate!, endDate!);
      if (carbonOffsetMessages) {
        impactTokens = carbonOffsetMessages.reduce((acc, message) => acc + Number(message.value ?? 0), 0);
      }
      onContinue(startDate!, endDate!, impactTokens);
    } catch (error) {
      console.error(error);
    }
  }

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(e.target.value);
  }

  function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(e.target.value);
  }

  return (
    <main className={cls(utilsStyles.main, utilsStyles.columnJustifyAlignCenter)}>
      <label htmlFor='start-date'>Start Date</label>
      <Card
        style={{ padding: 0 }}
        size={CARD_SIZE.medium}
        bgColor={!startDate ? CARD_BG_COLOR.grey : CARD_BG_COLOR.primary}
      >
        <input
          style={{
            width: '100%',
            height: '100%',
            padding: 10,
            background: 'transparent',
            borderColor: 'transparent',
            color: getCSSVariable('--main-font-color'),
          }}
          type='date'
          id='start-date'
          value={startDate}
          max={todayRef.current}
          onChange={handleStartDateChange}
        />
      </Card>
      <div className={utilsStyles.spacer2} />
      <label htmlFor='end-date'>End Date</label>
      <Card
        style={{ padding: 0 }}
        size={CARD_SIZE.medium}
        bgColor={!endDate ? CARD_BG_COLOR.grey : CARD_BG_COLOR.primary}
      >
        <input
          style={{
            width: '100%',
            height: '100%',
            padding: 10,
            background: 'transparent',
            borderColor: 'transparent',
            color: getCSSVariable('--main-font-color'),
          }}
          type='date'
          id='end-date'
          value={endDate}
          max={todayRef.current}
          onChange={handleEndDateChange}
        />
      </Card>
      <div className={utilsStyles.spacer2} />
      <Button
        onClick={handleContinuePress}
        label={`Continue`}
        size={BUTTON_SIZE.mediumLarge}
        rounded
        bgColor={!startDate || !endDate ? BUTTON_BG_COLOR.grey : BUTTON_BG_COLOR.primary}
        borderColor={!startDate || !endDate ? BUTTON_BORDER_COLOR.grey : BUTTON_BORDER_COLOR.primary}
        color={BUTTON_COLOR.white}
        disabled={!startDate || !endDate}
      />
    </main>
  );
};

export default SelectStartAndEndDate;
