// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Card, Button, Icon } from 'semantic-ui-react';

import { type Action } from 'types/action';
import { InvalidArgumentError } from 'errors';
import ResetPasswordForm, { type ResetPasswordFormValues } from 'forms/ResetPasswordForm';

import actions from '../../actions';

type DispatchProps = {|
  onResetPasswordFormSubmit: (values: ResetPasswordFormValues) => void,
|};

type PassedProps = {|
  resetPasswordToken: string,
|};

type Props = {| ...TranslatorProps, ...DispatchProps, ...PassedProps |};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    onResetPasswordFormSubmit: (values: ResetPasswordFormValues): void => {
      if (
        values.password == null
        || values.resetPasswordToken == null
      ) {
        // Make flow happy; #TODO replace with proper redux-form validation
        throw new InvalidArgumentError(`Form data incomplete`);
      }
      dispatch(actions.resetPassword(values.password, values.resetPasswordToken));
    },
  };
};

const PureResetPasswordCard = (props: Props): React.Node => {
  const { t, onResetPasswordFormSubmit, resetPasswordToken } = props;

  return (
    <Card centered={true}>
      <Card.Content>
        <Card.Header>
          {t('platform:resetPasswordCard.title')}
        </Card.Header>
        <Card.Description>
          {t('platform:resetPasswordCard.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <ResetPasswordForm
          onSubmit={onResetPasswordFormSubmit}
          initialValues={{ resetPasswordToken }}
        >
          <Button primary={true} type="submit" fluid={true} icon={true} labelPosition="left">
            <Icon name="user" />
            {t('platform:resetPasswordCard.button.submit')}
          </Button>
        </ResetPasswordForm>
      </Card.Content>
    </Card>
  );
};

const ResetPasswordCard = connect(null, mapDispatchToProps)(translate()(PureResetPasswordCard));

export { PureResetPasswordCard };
export default ResetPasswordCard;
