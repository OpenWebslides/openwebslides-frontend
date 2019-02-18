// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import ResetPasswordForm, { type ResetPasswordFormValues } from 'forms/ResetPasswordForm';

import actions from '../../actions';

type PassedProps = {|
  resetPasswordToken: string,
|};

type DispatchProps = {|
  onResetPasswordFormSubmit: (values: ResetPasswordFormValues) => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onResetPasswordFormSubmit: (values: ResetPasswordFormValues): void => {
      dispatch(actions.resetPassword(values.password, values.resetPasswordToken));
    },
  };
};

const PureResetPasswordCard = (props: Props): React.Node => {
  const { onResetPasswordFormSubmit, resetPasswordToken } = props;
  const [t] = useTranslation();

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
          resetPasswordToken={resetPasswordToken}
        >
          <Button primary={true} type="submit" fluid={true}>
            {t('platform:resetPasswordCard.button.submit')}
          </Button>
        </ResetPasswordForm>
      </Card.Content>
    </Card>
  );
};

const ResetPasswordCard = connect(null, mapDispatchToProps)(PureResetPasswordCard);

export { PureResetPasswordCard };
export default ResetPasswordCard;
