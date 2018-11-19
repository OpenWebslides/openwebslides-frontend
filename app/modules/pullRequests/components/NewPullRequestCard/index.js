// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import { type ModulesAction, type AppState } from 'types/redux';
import InlineMarkdown from 'components/InlineMarkdown';
import PullRequestForm, { type PullRequestFormValues } from 'forms/PullRequestForm';
import topics from 'modules/topics';

type PassedProps = {|
  sourceTopicId: string,
  targetTopicId: string,
  onCreatePullRequest: (message: string, sourceTopicId: string, targetTopicId: string) => void,
|};

type StateProps = {|
  sourceTopic: ?topics.model.Topic,
  targetTopic: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchTopic: (topicId: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { sourceTopicId, targetTopicId } = props;

  return {
    sourceTopic: topics.selectors.getById(state, { id: sourceTopicId }),
    targetTopic: topics.selectors.getById(state, { id: targetTopicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  return {
    fetchTopic: (topicId: string): void => {
      dispatch(topics.actions.fetch(topicId));
    },
  };
};

class PureNewPullRequestCard extends React.Component<Props> {
  componentDidMount(): void {
    const { sourceTopicId, targetTopicId, sourceTopic, targetTopic, fetchTopic } = this.props;
    if (sourceTopic == null) fetchTopic(sourceTopicId);
    if (targetTopic == null) fetchTopic(targetTopicId);
  }

  handlePullRequestFormSubmit = (values: PullRequestFormValues): void => {
    const { onCreatePullRequest, sourceTopic, targetTopic } = this.props;
    onCreatePullRequest(values.message, sourceTopic.id, targetTopic.id);
  };

  render(): React.Node {
    const { t, sourceTopic, targetTopic } = this.props;

    if (sourceTopic == null || targetTopic == null) {
      return null;
    }

    return (
      <Card centered={true} data-test-id="new-pull-request-card">
        <Card.Content>
          <Card.Header>
            {t('pullRequests:newPullRequestCard.title')}
          </Card.Header>
          <Card.Description>
            <p>
              <InlineMarkdown text={t('pullRequests:newPullRequestCard.description', { topicTitle: sourceTopic.title })} />
            </p>
            <p>
              From: <strong>{sourceTopic.title}</strong>
            </p>
            <p>
              To: <strong>{targetTopic.title}</strong>
            </p>
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
  }
}

const NewPullRequestCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNamespaces()(PureNewPullRequestCard));

export { PureNewPullRequestCard };
export default NewPullRequestCard;
