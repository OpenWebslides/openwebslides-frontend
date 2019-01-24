// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon, Comment } from 'semantic-ui-react';

import { TOPIC_VIEWER_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';

import * as m from '../../../../model';

type PassedProps = {|
  pullRequest: m.PullRequest,
  source: topics.model.Topic,
  target: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureState = (props: Props): React.Node => {
  const { t, pullRequest, source, target } = props;

  let icon: string = 'send';
  let color: string = 'yellow';

  switch (pullRequest.state) {
    case m.pullRequestStates.PENDING:
    case m.pullRequestStates.READY:
    case m.pullRequestStates.WORKING:
      icon = 'question';
      color = 'yellow';
      break;
    case m.pullRequestStates.INCOMPATIBLE:
      icon = 'exclamation';
      color = 'red';
      break;
    case m.pullRequestStates.ACCEPTED:
      icon = 'check';
      color = 'green';
      break;
    case m.pullRequestStates.REJECTED:
      icon = 'times';
      color = 'red';
      break;
    default:
      break;
  }

  return (
    <Comment>
      <Comment.Avatar style={{ display: 'none' }} />
      <Icon name={icon} size="big" color={color} style={{ display: 'block', float: 'left', margin: '0.2em 0em 0em' }} />
      <Comment.Content>
        <Comment.Author as="span" className={`ui header ${color}`}>
          {t(`pullRequests:comments.state.titleForState.${pullRequest.state}`)}
        </Comment.Author>
        <Comment.Metadata>
          {/* TODO: timestamp of accept/reject */}
        </Comment.Metadata>
        <Comment.Text>
          <Trans
            i18nKey={`pullRequests:comments.state.textForState.${pullRequest.state}`}
            values={{
              count: 0, // TODO
              sourceTopicTitle: source.title,
              targetTopicTitle: target.title,
            }}
          >
            <Link to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: source.id })}>
              source
            </Link>
            <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: target.id })}>
              target
            </Link>
          </Trans>
          {(pullRequest.feedback == null ? null : (
            <blockquote data-test-id="comments-feedback">
              <em>{pullRequest.feedback}</em>
            </blockquote>
          ))}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

const State = withNamespaces()(PureState);

export { PureState };
export default State;
