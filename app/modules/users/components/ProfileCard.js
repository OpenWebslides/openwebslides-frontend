// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import _ from 'lodash';
import md5 from 'blueimp-md5';
import type { State } from 'types/state';
import SimpleList from 'modules/topics/components/SimpleList';
import type { User } from '../model';
import { getById } from '../selectors';
import { GRAVATAR_SIZE_LARGE } from '../constants';

type PassedProps = {
  // TODO: change to identifier once fallback option for
  // erroneous input in /profile/:id is implemented
  userId: string,
};

type StateProps = {
  user: User,
};

type Props = PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    user: getById(state, props.userId),
  };
};

const PureProfileCard = (props: Props): React.Node => {
  const { user } = props;

  const imageHash = md5(_.trim(user.email).toLowerCase());

  return (
    <Card>
      <Image src={`https://www.gravatar.com/avatar/${imageHash}?s=${GRAVATAR_SIZE_LARGE}`} />
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
