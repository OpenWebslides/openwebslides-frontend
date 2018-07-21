// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPage from 'core-components/ContainerPage';

type Props = TranslatorProps;

const PureNotFoundPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <ContainerPage>
      <h1>{t('errors:http.404')}</h1>
    </ContainerPage>
  );
};

const NotFoundPage = translate()(PureNotFoundPage);

export { PureNotFoundPage };
export default NotFoundPage;
