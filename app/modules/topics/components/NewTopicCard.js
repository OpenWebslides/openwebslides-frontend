// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import type { RouterHistory } from 'react-router-dom';
import authentication from 'modules/authentication';
import { add } from '../actions';

const { getAccount } = authentication.selectors;

type DispatchProps = {
  onAddButtonClick: (Identifier, string, string, RouterHistory) => void,
};

type StateProps = {
  userId: Identifier,
};

type Props = CustomTranslatorProps & DispatchProps & FormProps & RouterHistory;

const mapStateToProps = (state: State): StateProps => {
  const account = getAccount(state);

  // TODO: does this need null checks or is it impossible to access when not logged in?
  const CURRENT_USER = account != null ? account.id : 'markfrank1';

  return {
    userId: CURRENT_USER,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onAddButtonClick: (
      userId: Identifier,
      title: string,
      description: string,
      history: RouterHistory,
    ): void => {
      dispatch(
        add(userId, title, description, history),
      );
    },
  };
};

const NewTopicCardForm = (props: Props): React.Node => {
  const {
    t,
    handleSubmit,
  } = props;

  return (
    <Form onSubmit={handleSubmit} size="large">
      <Form.Field width="6">
        <label htmlFor="title" control={Form.Input}>
          {t('common:form.title')}
          <Field
            id="title"
            component={Form.Input}
            name="title"
            placeholder={t('common:form.title')}
          />
        </label>
      </Form.Field>

      <Form.Field width="6">
        <label htmlFor="description" control="textarea">
          {t('common:form.description')}
          <Field
            id="description"
            component="textarea"
            name="description"
            placeholder={t('common:form.description')}
          />
        </label>
      </Form.Field>

      <Form.Group>
        <Link to="/Library">
          <Button as="span" secondary={true}>
            {t('common:button.cancel')}
          </Button>
        </Link>
        <Form.Button id="form-button-control-public" content={t('common:button.save')} primary={true} />
      </Form.Group>
    </Form>
  );
};

const NewTopicCardFormHOC = reduxForm({
  form: 'newtopic',
})(NewTopicCardForm);

const PureNewTopicCard = (props: Props): React.Node => {
  const {
    t,
    onAddButtonClick,
    userId,
    history,
  } = props;

  // TODO: the flow type for values might be a bit dodgy
  const handleSubmit = (values: { +[values: * ]: string }): void => {
    onAddButtonClick(userId, values.title, values.description, history);
  };

  return (
    <div>
      <NewTopicCardFormHOC t={t} onSubmit={handleSubmit} />
    </div>
  );
};

const TNewTopicCard = translate()(PureNewTopicCard);
const NewTopicCard = withRouter(connect(mapStateToProps, mapDispatchToProps)(TNewTopicCard));

export { PureNewTopicCard };
export default NewTopicCard;
