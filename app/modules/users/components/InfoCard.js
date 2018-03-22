// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Card, Image } from 'semantic-ui-react';
import professor from 'assets/images/card/professor.jpg';

type Props = TranslatorProps;

const PureInfoCard = (props: Props): React.Node => {
  const { t } = props;

  const name = t('profile:name');
  return (
    <Card>
      <Image src={professor} />
      <Card.Content>
        <Card.Header>
          {name}: USER NAME
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

const InfoCard = translate()(PureInfoCard);

export { PureInfoCard };
export default InfoCard;
