// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

type Props = TranslatorProps;

const PureFeedCollection = (props: Props): React.Node => {
  const {
    t,
  } = props;

  return (
    <div>
      <p>{t('common:button.save')}</p>
    </div>
  );
};

const FeedCollection = translate()(PureFeedCollection);

export { PureFeedCollection };
export default FeedCollection;
