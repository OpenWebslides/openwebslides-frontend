// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import { CURRENT_USER } from 'modules/users/constants';
import type { RouterHistory } from 'react-router-dom';
import { add } from '../actions';


type DispatchProps = {
  onAddButtonClick: (string, string, RouterHistory) => void,
};

type Props = TranslatorProps & DispatchProps & FormProps & RouterHistory;

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onAddButtonClick: (title: string, description: string, history: RouterHistory): void => {
      dispatch(
        add(CURRENT_USER, title, description),
      ).then(history.replace('/library'));
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
    history,
  } = props;

  // TODO: the flow type for values might be a bit dodgy
  const handleSubmit = (values: { +[values: * ]: string }): void => {
    onAddButtonClick(values.title, values.description, history);
  };

  return (
    <div>
      <NewTopicCardFormHOC t={t} onSubmit={handleSubmit} />
    </div>
  );
};

const NewTopicCard = withRouter(connect(null, mapDispatchToProps)(translate()(PureNewTopicCard)));

export { PureNewTopicCard };
export default NewTopicCard;
