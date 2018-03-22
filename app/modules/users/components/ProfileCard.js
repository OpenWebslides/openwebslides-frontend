// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import professor from 'assets/images/card/professor.jpg';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';
import type { User } from '../model';
import { getById } from '../selectors';

type PassedProps = {
  userId: Identifier,
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

  return (
    <Card>
      <Image src={professor} />
      <Card.Content>
        <Card.Header>
          {user.firstName} &nbsp; {user.lastName}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <p>
          Topic 1
        </p>
        <p>
          Topic 2
        </p>
      </Card.Content>
    </Card>
  );
};

const ProfileCard = connect(mapStateToProps)(PureProfileCard);

export { PureProfileCard };
export default ProfileCard;
