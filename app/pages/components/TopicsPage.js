// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import topics from 'modules/topics';

type Props = TranslatorProps & { /* new props go here */ };

const TopicsList = topics.components.components.list;

const TopicsPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <p>{t('common:lipsum.short')}</p>
      <TopicsList />
    </div>
  );
};

export default translate()(TopicsPage);
