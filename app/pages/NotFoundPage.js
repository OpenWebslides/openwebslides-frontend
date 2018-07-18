// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import Page from 'core-components/Page';

type Props = TranslatorProps;

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
