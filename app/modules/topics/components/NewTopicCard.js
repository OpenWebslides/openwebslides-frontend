// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import type { RouterHistory } from 'react-router-dom';

import { UnsupportedOperationError } from 'errors';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import platform from 'modules/platform';

import { add } from '../actions';

type StateProps = {|
  userId: Identifier,
|};

type DispatchProps = {|
  onAddButtonClick: (Identifier, string, string, RouterHistory) => void,
|};

type Props = {|
  ...TranslatorProps,
  ...FormProps,
  ...$Exact<RouterHistory>,
  ...StateProps,
  ...DispatchProps,
|};

const mapStateToProps = (state: State): StateProps => {
  const userAuth = platform.selectors.getUserAuth(state);

  if (userAuth == null) {
    throw new UnsupportedOperationError(`This shouldn't happen`);
  }

  return {
    userId: userAuth.userId,
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
          {t('topics:form.title')}
          <Field
            id="title"
            component={Form.Input}
            name="title"
            placeholder={t('topics:form.title')}
          />
        </label>
      </Form.Field>

      <Form.Field width="6">
        <label htmlFor="description" control="textarea">
          {t('topics:form.description')}
          <Field
            id="description"
            component="textarea"
            name="description"
            placeholder={t('topics:form.description')}
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
      { /* #TODO */ }
      { /* eslint-disable-next-line react/jsx-no-bind */ }
      <NewTopicCardFormHOC t={t} onSubmit={handleSubmit} />
    </div>
  );
};

const TNewTopicCard = translate()(PureNewTopicCard);
const NewTopicCard = withRouter(connect(mapStateToProps, mapDispatchToProps)(TNewTopicCard));

export { PureNewTopicCard };
export default NewTopicCard;
