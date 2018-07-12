// @flow

import * as React from 'react';
import { translate } from 'react-i18next';

import Page from 'core-components/Page';
import type { CustomTranslatorProps } from 'types/translator';

type Props = CustomTranslatorProps & { /* new props go here */ };

const PureNotFoundPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page>
      <h1>{t('errors:http.404')}</h1>
    </Page>
  );
};

const NotFoundPage = translate()(PureNotFoundPage);

export { PureNotFoundPage };
export default NotFoundPage;
