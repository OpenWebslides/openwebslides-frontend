// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { InvalidArgumentError } from 'errors';
import TopicForm, { type TopicFormValues } from 'forms/TopicForm';

type PassedProps = {|
  onAddTopic: (title: string, description: ?string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureNewTopicCard extends React.Component<Props> {
  handleTopicFormSubmit = (values: TopicFormValues): void => {
    const { onAddTopic } = this.props;
    // Make flow happy; #TODO replace with proper redux-form validation
    if (values.title == null) throw new InvalidArgumentError(`Form data incomplete`);
    onAddTopic(values.title, values.description);
  };

  render(): React.Node {
    const { t } = this.props;

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
          <TopicForm
            onSubmit={this.handleTopicFormSubmit}
            data-test-id="new-topic-card-form"
          />
        </Card.Content>
      </Card>
    );
  }
}

const NewTopicCard = withNamespaces()(PureNewTopicCard);

export { PureNewTopicCard };
export default NewTopicCard;
