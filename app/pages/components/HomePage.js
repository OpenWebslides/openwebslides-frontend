// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';

type Props = TranslatorProps & { /* new props go here */ };

const HomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <p><Link to="/topics">Topics page</Link></p>
      <p>
        <button>{t('common:button.cancel')}</button> {`<-- This doesn't do anything!`}
      </p>
    </div>
  );
};

export default translate()(HomePage);
