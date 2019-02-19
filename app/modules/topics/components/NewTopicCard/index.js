// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import TopicForm, { type TopicFormValues } from 'forms/TopicForm';

type PassedProps = {|
  onAddTopic: (title: string, description: ?string) => void,
|};

type Props = {| ...PassedProps |};

class PureNewTopicCard extends React.Component<Props> {
  handleTopicFormSubmit = (values: TopicFormValues): void => {
    const { onAddTopic } = this.props;
    onAddTopic(values.title, values.description);
  };

  render(): React.Node {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
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
              <TopicForm onSubmit={this.handleTopicFormSubmit} />
            </Card.Content>
          </Card>
        )}
      </Translation>
    );
  }
}

const NewTopicCard = PureNewTopicCard;

export { PureNewTopicCard };
export default NewTopicCard;
