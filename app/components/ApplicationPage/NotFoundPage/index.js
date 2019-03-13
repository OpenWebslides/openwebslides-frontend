// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';

type Props = {| |};

const PureNotFoundPage = (props: Props): React.Node => {
  const [t] = useTranslation();

  return (
    <ContainerPageWrapper>
      <h1>{t('errors:http.404')}</h1>
    </ContainerPageWrapper>
  );
};

const NotFoundPage = PureNotFoundPage;

export { PureNotFoundPage };
export default NotFoundPage;
