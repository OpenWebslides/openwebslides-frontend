// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { TOPIC_VIEWER_ROUTE, TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../../../model';

type PassedProps = {|
  pullRequest: m.PullRequest,
  source: topics.model.Topic,
  target: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { UserComment } = users.components;

const PureSubmitComment = (props: Props): React.Node => {
  const { pullRequest, source, target } = props;

  return (
    <UserComment userId={pullRequest.userId} timestamp={pullRequest.timestamp}>
      <Trans
        i18nKey="pullRequests:comments.submit.text"
        values={{
          count: 0, // TODO
          sourceTopicTitle: source.title,
          targetTopicTitle: target.title,
        }}
      >
        <Link to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: target.id })}>
          target
        </Link>
        <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: source.id })}>
          source
        </Link>
      </Trans>
      <blockquote>
        <em>{pullRequest.message}</em>
      </blockquote>
    </UserComment>
  );
};

const SubmitComment = withNamespaces()(PureSubmitComment);

export { PureSubmitComment };
export default SubmitComment;
