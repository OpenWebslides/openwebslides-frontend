// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { withRouter, type ContextRouter as RouterProps } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

type Props = {| ...TranslatorProps, ...RouterProps |};

const PureBackButton = (props: Props): React.Node => {
  const { t, history } = props;

  return (
    <Button type="button" icon={true} labelPosition="left" onClick={history.goBack}>
      <Icon name="arrow left" />
      {t('common:button.back')}
    </Button>
  );
};

const BackButton = withNamespaces()(withRouter(PureBackButton));

export { PureBackButton };
export default BackButton;
