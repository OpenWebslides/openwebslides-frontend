// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Button, Header, Icon } from 'semantic-ui-react';

import { type AppState } from 'types/redux';
import FetchWrapper from 'components/FetchWrapper';
import topics from 'modules/topics';
import users from 'modules/users';

type PassedProps = {|
  topicId: string,
  onSubmitPullRequest: (topicId: string) => void,
|};

type StateProps = {|
  topic: ?topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { topicId } = props;

  return {
    topic: topics.selectors.getById(state, { id: topicId }),
  };
};

class PurePullRequest extends React.Component<Props> {
  handleSubmitButtonClick = (): void => {
    const { onSubmitPullRequest, topicId } = this.props;
    onSubmitPullRequest(topicId);
  }

  fetchCondition = (topic: ?topics.model.Topic): boolean => {
    return (topic == null || !topic.isContentFetched);
  };

  renderPullRequest = (topic: topics.model.Topic): React.Node => {
    const { t } = this.props;

    return (
      <div data-test-id="topic-pull-request">
        <div style={{ overflow: 'hidden' }}>
          <Header floated="left" as="h1">{topic.title}</Header>
          <Button
            floated="right"
            primary={true}
            icon={true}
            labelPosition="left"
            onClick={this.handleSubmitButtonClick}
            data-test-id="topic-pull-request-submit-button"
          >
            <Icon name="send" />
            {t('pullRequests:button.submit')}
          </Button>
        </div>
      </div>
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
        fetchCondition={this.fetchCondition}
      />
    );
  }
}

const PullRequest = connect(mapStateToProps)(withNamespaces()(PurePullRequest));

export { PurePullRequest };
export default PullRequest;
