// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import InlineMarkdown from 'components/InlineMarkdown';
import FetchWrapper from 'components/FetchWrapper';
import PullRequestForm, { type PullRequestFormValues } from 'forms/PullRequestForm';
import topics from 'modules/topics';

type PassedProps = {|
  topicId: string,
  onCreatePullRequest: (topicId: string, message: string) => void,
|};

type StateProps = {|
  topic: ?topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps |};

class PureNewPullRequestCard extends React.Component<Props> {
  handlePullRequestFormSubmit = (values: PullRequestFormValues): void => {
    const { onCreatePullRequest, topicId } = this.props;
    onCreatePullRequest(topicId, values.message);
  };

  renderPullRequest = (topic: topics.model.Topic): React.Node => {
    const { t } = this.props;

    return (
      <Card centered={true} data-test-id="new-pull-request-card">
        <Card.Content>
          <Card.Header>
            {t('pullRequests:newPullRequestCard.title')}
          </Card.Header>
          <Card.Description>
            <InlineMarkdown text={t('pullRequests:newPullRequestCard.description', { topicTitle: topic.title })} />
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <PullRequestForm
            onSubmit={this.handlePullRequestFormSubmit}
            data-test-id="new-pull-request-card-form"
          />
        </Card.Content>
      </Card>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderPullRequest}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={topics.actions.fetchWithContent}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const NewPullRequestCard = withNamespaces()(PureNewPullRequestCard);

export { PureNewPullRequestCard };
export default NewPullRequestCard;
