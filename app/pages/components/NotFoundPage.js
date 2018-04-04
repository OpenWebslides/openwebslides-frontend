// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import Page from '../Page';

type Props = TranslatorProps & { /* new props go here */ };

const PureNotFoundPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Page>
      <h1>{t('errors:http.404')}</h1>
    </Page>
  );
};

const NotFoundPage = translate()(PureNotFoundPage);

export { PureNotFoundPage };
export default NotFoundPage;
