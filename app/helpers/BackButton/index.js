// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { withRouter, type ContextRouter as RouterProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

type Props = {| ...TranslatorProps, ...RouterProps |};

const PureBackButton = (props: Props): React.Node => {
  const { t, history } = props;

  return (
    <Button type="button" secondary={true} onClick={history.goBack}>
      {t('common:button.back')}
    </Button>
  );
};

const BackButton = translate()(withRouter(PureBackButton));

export { PureBackButton };
export default BackButton;
