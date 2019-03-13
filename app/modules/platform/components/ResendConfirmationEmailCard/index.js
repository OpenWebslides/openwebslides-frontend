// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import EmailForm, { type EmailFormValues } from 'forms/EmailForm';

import actions from '../../actions';

type DispatchProps = {|
  onEmailFormSubmit: (values: EmailFormValues) => void,
|};

type Props = {| ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onEmailFormSubmit: (values: EmailFormValues): void => {
      dispatch(actions.resendConfirmationEmail(values.email));
    },
  };
};

const PureResendConfirmationEmailCard = (props: Props): React.Node => {
  const { onEmailFormSubmit } = props;
  const [t] = useTranslation();

  return (
    <Card centered={true}>
      <Card.Content>
        <Card.Header>
          {t('platform:resendConfirmationEmailCard.title')}
        </Card.Header>
        <Card.Description>
          {t('platform:resendConfirmationEmailCard.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <EmailForm onSubmit={onEmailFormSubmit} />
      </Card.Content>
    </Card>
  );
};

const ResendConfirmationEmailCard = connect(null, mapDispatchToProps)(
  PureResendConfirmationEmailCard,
);

export { PureResendConfirmationEmailCard };
export default ResendConfirmationEmailCard;
