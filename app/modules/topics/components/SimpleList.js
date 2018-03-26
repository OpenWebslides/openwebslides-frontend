// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import SimpleTopic from './SimpleTopic';

import { getAllTopicIdsWithUserId } from '../selectors';


type StateProps = {
  topicIds: Array<Identifier>,
};
type PassedProps = {
  userId: Identifier,
};

type Props = TranslatorProps & StateProps & PassedProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    topicIds: getAllTopicIdsWithUserId(state, props.userId),
  };
};

const PureSimpleList = (props: Props): React.Node => {
  const {
    t,
    topicIds,
  } = props;

  return (
    <div>
      <Header size="small">{t('profile:card.topics')}:</Header>
      {topicIds.map((topicId) => (
        <SimpleTopic key={topicId} topicId={topicId} />
      ))}
    </div>
  );
};

const SimpleList = connect(mapStateToProps)(translate()(PureSimpleList));

export { PureSimpleList };
export default SimpleList;
