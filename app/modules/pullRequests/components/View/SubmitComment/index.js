// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

import { USER_PROFILE_BY_ID_ROUTE, TOPIC_VIEWER_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';
// import users from 'modules/users';

import * as m from '../../../model';

type PassedProps = {|
  pullRequest: m.PullRequest,
|};

type StateProps = {|
  // user: ?users.model.User,
  user: any,
  source: ?topics.model.Topic,
  target: ?topics.model.Topic,
|};

type DispatchProps = {|
  fetchTopic: (id: string) => void,
  // fetchUser: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { pullRequest } = props;

  return {
    // user: users.selectors.getById(state, { id: pullRequest.userId }),
    user: {
      email: 'florian@floriandejonckheere.be',
      name: 'Florian Dejonckheere',
      gravatarHash: 'bb6445d11275c312921d8365619067a7',
      topicIds: ['2', '3', '4'],
    },
    source: topics.selectors.getById(state, { id: pullRequest.sourceTopicId }),
    target: topics.selectors.getById(state, { id: pullRequest.targetTopicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { pullRequest } = props;

  return {
    fetchTopic: (id: string): void => {
      dispatch(topics.actions.fetch(id));
    },
    // fetchUser: (): void => {
    //   dispatch(users.actions.fetch(pullRequest.userId));
    // },
  };
};

class PureSubmitComment extends React.Component<Props> {
  componentDidMount(): void {
    const { pullRequest, user, source, target, fetchUser, fetchTopic } = this.props;
    // if (user == null) fetchUser();
    if (source == null) fetchTopic(pullRequest.sourceTopicId);
    if (target == null) fetchTopic(pullRequest.targetTopicId);
  }

  render(): React.Node {
    const { t, pullRequest, user, source, target } = this.props;

    // if (user == null || source == null || target == null) return null;
    if (source == null || target == null) return null;

    return (
      <Comment>
        {/* <Comment.Avatar src={users.lib.getGravatarSrc(user, 200)} /> */}
        <Comment.Avatar src="https://www.gravatar.com/avatar/bb6445d11275c312921d8365619067a7?default=mp&size=500" />
        <Comment.Content>
          <Comment.Author as={Link} to={makeRoute(USER_PROFILE_BY_ID_ROUTE, { userId: pullRequest.userId })}>
            {user.name}
          </Comment.Author>
          <Comment.Metadata>
            {t('pullRequests:comments.submit.timestamp', { timestamp: moment(pullRequest.timestamp).fromNow() })}
          </Comment.Metadata>
          <Comment.Text>
            <p>
              <Trans
                i18nKey="pullRequests:comments.submit.text"
                values={{
                  userName: user.name,
                  count: 0, // TODO
                  sourceTopicTitle: source.title,
                  targetTopicTitle: target.title,
                }}
              >
                <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: source.id })}>
                  source
                </Link>
                <Link to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: target.id })}>
                  source
                </Link>
              </Trans>
            </p>
            <blockquote>
              <em>{pullRequest.message}</em>
            </blockquote>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

const SubmitComment = connect(mapStateToProps, mapDispatchToProps)(
  withNamespaces()(PureSubmitComment),
);

export { PureSubmitComment };
export default SubmitComment;
