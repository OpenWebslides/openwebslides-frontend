// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { add } from '../actions';

type DispatchProps = {
  onAddButtonClick: (string) => void,
};

type Props = TranslatorProps & DispatchProps & FormProps;

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onAddButtonClick: (title: string, description: string): void => {
      dispatch(
        add(title, description),
      );
    },
  };
};

const NewTopicCardForm = (props: TranslatorProps): React.Node => {
  const {
    t,
    handleSubmit,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="title">
        {t('common:form.title')}
        <Field id="title" name="title" component="input" type="text" />
      </label>


      <label htmlFor="description">
        {t('common:form.description')}
        <Field id="description" name="description" component="input" type="text" />
      </label>

      <Form.Group>
        <Form.Field id="form-button-control-public" control={Button}>
          <Link to="/Library">{t('common:button.cancel')}</Link>
        </Form.Field>
        <Form.Button id="form-button-control-public" content={t('common:button.save')} />
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
  } = props;

  const handleSubmit = (values: string): void => {
    onAddButtonClick(values.title, values.description);
  };

  return (
    <div>
      <NewTopicCardFormHOC t={t} onSubmit={handleSubmit} />
    </div>
  );
};

const NewTopicCard = connect(null, mapDispatchToProps)(translate()(PureNewTopicCard));

export { PureNewTopicCard };
export default NewTopicCard;
