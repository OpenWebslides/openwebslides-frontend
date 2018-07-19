// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import BackButton from 'helpers/BackButton';

type Props = TranslatorProps;

const PureSubmitButtonGroup = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Button.Group fluid={true}>
      <Button primary={true} type="submit">
        {t('common:button.submit')}
      </Button>
      <BackButton />
    </Button.Group>
  );
};

const SubmitButtonGroup = translate()(PureSubmitButtonGroup);

export { PureSubmitButtonGroup };
export default SubmitButtonGroup;
