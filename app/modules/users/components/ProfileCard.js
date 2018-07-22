// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';

import type { State } from 'types/state';
import Gravatar from 'components/Gravatar';
import topics from 'modules/topics';

import type { User } from '../model';
import { getById } from '../selectors';
import { GRAVATAR_SIZE_LARGE } from '../constants';

const { SimpleList } = topics.components;

type PassedProps = {|
  // TODO: change to identifier once fallback option for
  // erroneous input in /users/:id is implemented
  userId: string,
|};

type StateProps = {|
  user: User,
|};

type Props = {|
  ...PassedProps,
  ...StateProps,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { userId } = props;

  return {
    user: getById(state, userId),
  };
};

const PureProfileCard = (props: Props): React.Node => {
  const { user } = props;

  return (
    <Card>
      <Gravatar email={user.email} size={GRAVATAR_SIZE_LARGE} />
      <Card.Content>
        <Card.Header>
          {user.firstName}&nbsp;{user.lastName}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <SimpleList userId={user.id} />
      </Card.Content>
    </Card>
  );
};

const ProfileCard = connect(mapStateToProps)(PureProfileCard);

export { PureProfileCard };
export default ProfileCard;
