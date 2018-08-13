// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { type Action } from 'types/action';
import { InvalidArgumentError } from 'errors';
import TopicForm, { type TopicFormValues } from 'forms/TopicForm';

import actions from '../../actions';

type PassedProps = {|
  userId: string,
|};

type DispatchProps = {|
  onTopicFormSubmit: (values: TopicFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: PassedProps): DispatchProps => {
  const { userId } = props;

  return {
    onTopicFormSubmit: (values: TopicFormValues): void => {
      if (values.title == null) {
        // Make flow happy; #TODO replace with proper redux-form validation
        throw new InvalidArgumentError(`Form data incomplete`);
      }
      dispatch(actions.create(values.title, values.description, userId));
    },
  };
};

const PureNewTopicCard = (props: Props): React.Node => {
  const { t, onTopicFormSubmit } = props;

  return (
    <Card centered={true}>
      <Card.Content>
        <Card.Header>
          {t('topics:newTopicCard.title')}
        </Card.Header>
        <Card.Description>
          {t('topics:newTopicCard.description')}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <TopicForm onSubmit={onTopicFormSubmit} />
      </Card.Content>
    </Card>
  );
};

const NewTopicCard = connect(null, mapDispatchToProps)(translate()(PureNewTopicCard));

export { PureNewTopicCard };
export default NewTopicCard;
