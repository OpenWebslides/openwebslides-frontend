// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

import type { State } from 'types/state';
import { ObjectNotFoundError } from 'errors';
import topics from 'modules/topics';

import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

const { SimpleList } = topics.components;

type PassedProps = {|
  userId: string,
|};

type StateProps = {|
  user: m.User,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { userId } = props;
  const user = selectors.getById(state, { id: userId });
  if (user == null) throw new ObjectNotFoundError('users:user', userId);

  return {
    user,
  };
};

const PureProfileCard = (props: Props): React.Node => {
  const { user } = props;

  return (
    <Card>
      <Image src={lib.getGravatarSrc(user, 512)} />
      <Card.Content>
        <Card.Header>{user.name}</Card.Header>
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
