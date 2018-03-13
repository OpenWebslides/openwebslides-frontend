// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

type Props = TranslatorProps & { /* new props go here */ };

const PureHomePage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <div>
      <p><Link to="/topics">Topics page</Link></p>
      <p>
        <Button>{t('common:button.cancel')}</Button> {`<-- This doesn't do anything!`}
      </p>
    </div>
  );
};

const HomePage = translate()(PureHomePage);

export { PureHomePage };
export default HomePage;
