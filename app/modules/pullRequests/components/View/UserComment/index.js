// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

import FetchWrapper from 'components/FetchWrapper';
import { USER_PROFILE_BY_ID_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import users from 'modules/users';

type PassedProps = {|
  userId: string,
  timestamp: number,
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureUserComment extends React.Component<Props> {
  renderUserComment = (user: users.model.User): React.Node => {
    const { t, timestamp, children } = this.props;

    return (
      <Comment data-test-id="user-comment">
        <Comment.Avatar src={users.lib.getGravatarSrc(user, 200)} />
        <Comment.Content>
          <Comment.Author as={Link} to={makeRoute(USER_PROFILE_BY_ID_ROUTE, { userId: user.id })}>
            {user.name}
          </Comment.Author>
          <Comment.Metadata>
            {moment(timestamp).fromNow()}
          </Comment.Metadata>
          <Comment.Text>
            {children}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  };

  render(): React.Node {
    const { userId } = this.props;

    return (
      <FetchWrapper
        render={this.renderUserComment}
        renderPropsAndState={this.props}
        fetchId={userId}
        fetchAction={users.actions.fetch}
        fetchedPropSelector={users.selectors.getById}
      />
    );
  }
}

const UserComment = withNamespaces()(PureUserComment);

export { PureUserComment };
export default UserComment;
