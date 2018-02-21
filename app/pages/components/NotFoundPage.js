// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

type Props = TranslatorProps & { /* new props go here */ };

const NotFoundPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <h1>{t('errors:http.404')}</h1>
  );
};

export default translate()(NotFoundPage);
