// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

import { USER_PROFILE_BY_ID_ROUTE } from 'config/routes';
import { type ModulesAction, type AppState } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import users from 'modules/users';

type PassedProps = {|
  userId: string,
  timestamp: number,
  children: React.Node,
|};

type StateProps = {|
  user: ?users.model.User,
|};

type DispatchProps = {|
  fetchUser: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { userId } = props;

  return {
    user: users.selectors.getById(state, { id: userId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { userId } = props;

  return {
    fetchUser: (): void => {
      dispatch(users.actions.fetch(userId));
    },
  };
};

class PureUserComment extends React.Component<Props> {
  componentDidMount(): void {
    const { user, fetchUser } = this.props;
    if (user == null) fetchUser();
  }

  render(): React.Node {
    const { t, user, timestamp, children } = this.props;

    if (user == null) return null;

    return (
      <Comment>
        <Comment.Avatar src={users.lib.getGravatarSrc(user, 200)} />
        <Comment.Content>
          <Comment.Author as={Link} to={makeRoute(USER_PROFILE_BY_ID_ROUTE, { userId: user.id })}>
            {user.name}
          </Comment.Author>
          <Comment.Metadata>
            {t('pullRequests:comments.timestamp', { timestamp: moment(timestamp).fromNow() })}
          </Comment.Metadata>
          <Comment.Text>
            {children}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

const UserComment = connect(mapStateToProps, mapDispatchToProps)(
  withNamespaces()(PureUserComment),
);

export { PureUserComment };
export default UserComment;
