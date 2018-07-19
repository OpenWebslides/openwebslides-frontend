// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { InvalidArgumentError } from 'errors';
import EmailForm, { type EmailFormValues } from 'forms/EmailForm';

import actions from '../../actions';

type DispatchProps = {|
  onEmailFormSubmit: (values: EmailFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onEmailFormSubmit: (values: EmailFormValues): void => {
      if (values.email == null) {
        // Make flow happy; #TODO replace with proper redux-form validation
        throw new InvalidArgumentError(`Form data incomplete`);
      }
      dispatch(actions.confirmEmail(values.email));
    },
  };
};

const PureConfirmEmailCard = (props: Props): React.Node => {
  const { t, onEmailFormSubmit } = props;

  return (
    <Card fluid={true}>
      <Card.Content>
        <Card.Header>
          {t('platform:confirmEmailCard.title')}
        </Card.Header>
        <Card.Description>
          {t('platform:confirmEmailCard.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <EmailForm onSubmit={onEmailFormSubmit} />
      </Card.Content>
    </Card>
  );
};

const ConfirmEmailCard = connect(null, mapDispatchToProps)(translate()(PureConfirmEmailCard));

export { PureConfirmEmailCard };
export default ConfirmEmailCard;
