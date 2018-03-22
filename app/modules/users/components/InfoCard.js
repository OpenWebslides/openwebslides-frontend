// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
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

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    user: getById(state, props.userId),
  };
};

const PureInfoCard = (props: Props): React.Node => {
  const { t, user } = props;

  const firstName = t('profile:firstName');
  const lastName = t('profile:lastName');
  return (
    <Card>
      <Image src={professor} />
      <Card.Content>
        <Card.Header>
          {firstName}: {user.firstName} <br />
          {lastName}: {user.lastName}
        </Card.Header>
        <Card.Meta>
          <span className="date">
            Joined in de Dinosaurus-era
          </span>
        </Card.Meta>
        <Card.Description>
          Meneer USER NAME is a very smart professor.
          Unfortunately has he sociaal e bitje achterstand.
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <p>
          1 Friend
        </p>
      </Card.Content>
    </Card>
  );
};

const InfoCard = connect(mapStateToProps)(translate()(PureInfoCard));

export { PureInfoCard };
export default InfoCard;
