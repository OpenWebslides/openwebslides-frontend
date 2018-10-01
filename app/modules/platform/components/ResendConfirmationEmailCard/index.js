// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import { InvalidArgumentError } from 'errors';
import EmailForm, { type EmailFormValues } from 'forms/EmailForm';

import actions from '../../actions';

type DispatchProps = {|
  onEmailFormSubmit: (values: EmailFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onEmailFormSubmit: (values: EmailFormValues): void => {
      if (values.email == null) {
        // Make flow happy; #TODO replace with proper redux-form validation
        throw new InvalidArgumentError(`Form data incomplete`);
      }
      dispatch(actions.resendConfirmationEmail(values.email));
    },
  };
};

const PureResendConfirmationEmailCard = (props: Props): React.Node => {
  const { t, onEmailFormSubmit } = props;

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
  translate()(PureResendConfirmationEmailCard),
);

export { PureResendConfirmationEmailCard };
export default ResendConfirmationEmailCard;
