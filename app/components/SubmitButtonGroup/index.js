// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import BackButton from 'components/BackButton';

type Props = {| |};

const PureSubmitButtonGroup = (props: Props): React.Node => {
  const [t] = useTranslation();

  return (
    <Button.Group fluid={true} inverted={true}>
      <BackButton />
      <Button type="submit" primary={true} data-test-id="submit-button">
        {t('common:button.submit')}
      </Button>
    </Button.Group>
  );
};

const SubmitButtonGroup = PureSubmitButtonGroup;

export { PureSubmitButtonGroup };
export default SubmitButtonGroup;
