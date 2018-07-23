// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';

type Props = TranslatorProps;

const PureNotFoundPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <ContainerPageWrapper>
      <h1>{t('errors:http.404')}</h1>
    </ContainerPageWrapper>
  );
};

const NotFoundPage = translate()(PureNotFoundPage);

export { PureNotFoundPage };
export default NotFoundPage;
