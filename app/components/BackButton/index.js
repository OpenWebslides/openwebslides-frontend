// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter, type ContextRouter as RouterProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

type Props = {| ...RouterProps |};

const PureBackButton = (props: Props): React.Node => {
  const { history } = props;
  const [t] = useTranslation();

  return (
    <Button type="button" onClick={history.goBack} basic={true}>
      {t('common:button.back')}
    </Button>
  );
};

const BackButton = withRouter(PureBackButton);

export { PureBackButton };
export default BackButton;
