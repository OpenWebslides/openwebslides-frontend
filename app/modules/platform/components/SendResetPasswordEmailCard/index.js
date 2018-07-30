// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { type Action } from 'types/action';
import { InvalidArgumentError } from 'errors';
import EmailForm, { type EmailFormValues } from 'forms/EmailForm';

import actions from '../../actions';

type DispatchProps = {|
  onEmailFormSubmit: (values: EmailFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    onEmailFormSubmit: (values: EmailFormValues): void => {
      if (values.email == null) {
        // Make flow happy; #TODO replace with proper redux-form validation
        throw new InvalidArgumentError(`Form data incomplete`);
      }
      dispatch(actions.sendResetPasswordEmail(values.email));
    },
  };
};

const PureSendResetPasswordEmailCard = (props: Props): React.Node => {
  const { t, onEmailFormSubmit } = props;

  return (
    <Card centered={true}>
      <Card.Content>
        <Card.Header>
          {t('platform:sendResetPasswordEmailCard.title')}
        </Card.Header>
        <Card.Description>
          {t('platform:sendResetPasswordEmailCard.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <EmailForm onSubmit={onEmailFormSubmit} />
      </Card.Content>
    </Card>
  );
};

const TranslatedPureCard = translate()(PureSendResetPasswordEmailCard);
const SendResetPasswordEmailCard = connect(null, mapDispatchToProps)(TranslatedPureCard);

export { PureSendResetPasswordEmailCard };
export default SendResetPasswordEmailCard;