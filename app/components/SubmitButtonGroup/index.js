// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Button, Icon } from 'semantic-ui-react';

import BackButton from 'components/BackButton';

type Props = {| ...TranslatorProps |};

const PureSubmitButtonGroup = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Button.Group fluid={true}>
      <BackButton />
      <Button type="submit" primary={true} icon={true} labelPosition="left">
        {t('common:button.submit')}
        <Icon name="send" />
      </Button>
    </Button.Group>
  );
};

const SubmitButtonGroup = translate()(PureSubmitButtonGroup);

export { PureSubmitButtonGroup };
export default SubmitButtonGroup;
