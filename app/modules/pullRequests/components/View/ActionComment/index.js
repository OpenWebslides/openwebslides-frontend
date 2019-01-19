// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Comment, Button } from 'semantic-ui-react';

import { type ModulesAction, type AppState } from 'types/redux';
import PolicyWrapper from 'components/PolicyWrapper';
import policies from 'lib/policies';
import topics from 'modules/topics';

import * as m from '../../../model';

type PassedProps = {|
  pullRequest: m.PullRequest,
|};

type StateProps = {|
  source: ?topics.model.Topic,
  target: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchTopic: (id: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const { TopicPolicy } = policies;

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { pullRequest } = props;

  return {
    source: topics.selectors.getById(state, { id: pullRequest.sourceTopicId }),
    target: topics.selectors.getById(state, { id: pullRequest.targetTopicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  return {
    fetchTopic: (id: string): void => {
      dispatch(topics.actions.fetch(id));
    },
  };
};

class PureStateComment extends React.Component<Props> {
  componentDidMount(): void {
    const { pullRequest, source, target, fetchTopic } = this.props;
    if (source == null) fetchTopic(pullRequest.sourceTopicId);
    if (target == null) fetchTopic(pullRequest.targetTopicId);
  }

  render(): React.Node {
    const { t, source, target } = this.props;

    if (source == null || target == null) return null;

    return (
      <PolicyWrapper policy={TopicPolicy} record={target} action="update">
        <Comment data-test-id="state-comment">
          <Comment.Avatar />
          <Comment.Content>
            <Comment.Text>
              <Button.Group>
                <Button
                  color="red"
                  data-test-id="action-comment-reject-button"
                >
                  {t('pullRequests:button.reject')}
                </Button>
                <Button.Or />
                <Button
                  type="submit"
                  color="green"
                  data-test-id="action-comment-accept-button"
                >
                  {t('pullRequests:button.accept')}
                </Button>
              </Button.Group>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      </PolicyWrapper>
    );
  }
}

const StateComment = connect(mapStateToProps, mapDispatchToProps)(
  withNamespaces()(PureStateComment),
);

export { PureStateComment };
export default StateComment;
