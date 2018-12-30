// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import BackButton from 'components/BackButton';

type Props = {| ...TranslatorProps |};

const PureSubmitButtonGroup = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Button.Group fluid={true} inverted={true}>
      <BackButton />
      <Button type="submit" primary={true} data-test-id="submit-button">
        {t('common:button.submit')}
      </Button>
    </Button.Group>
  );
};

const SubmitButtonGroup = withNamespaces()(PureSubmitButtonGroup);

export { PureSubmitButtonGroup };
export default SubmitButtonGroup;
