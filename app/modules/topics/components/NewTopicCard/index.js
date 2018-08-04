// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Field, reduxForm, type FormProps } from 'redux-form';
import { translate, type TranslatorProps } from 'react-i18next';
import { Form } from 'semantic-ui-react';

import { type Action } from 'types/action';
import BackButton from 'components/BackButton';

import actions from '../../actions';

type PassedProps = {|
  userId: string,
|};

type DispatchProps = {|
  onAddButtonClick: (string, string, string) => void,
|};

type Props = {| ...TranslatorProps, ...FormProps, ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    onAddButtonClick: (
      userId: string,
      title: string,
      description: string,
    ): void => {
      dispatch(actions.create(title, description, userId));
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
        <BackButton />
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
  } = props;

  const handleSubmit = (values: { title: string, description: string }): void => {
    onAddButtonClick(userId, values.title, values.description);
  };

  return (
    <div>
      <h1>{t('global:title.createNewTopic')}</h1>
      { /* #TODO */ }
      { /* eslint-disable-next-line react/jsx-no-bind */ }
      <NewTopicCardFormHOC t={t} onSubmit={handleSubmit} />
    </div>
  );
};

const NewTopicCard = connect(null, mapDispatchToProps)(translate()(PureNewTopicCard));

export { PureNewTopicCard };
export default NewTopicCard;
