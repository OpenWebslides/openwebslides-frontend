// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import type { CustomTranslatorProps } from 'types/translator';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import { getAllTopicIdsByUserId } from '../selectors';

import SimpleTopic from './SimpleTopic';

type StateProps = {
  topicIds: Array<Identifier>,
};
type PassedProps = {
  userId: Identifier,
};

type Props = CustomTranslatorProps & StateProps & PassedProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { userId } = props;
  return {
    topicIds: getAllTopicIdsByUserId(state, userId),
  };
};

const PureSimpleList = (props: Props): React.Node => {
  const {
    t,
    topicIds,
  } = props;

  return (
    <div>
      <Header size="small">{t('global:title.topics')}:</Header>
      {topicIds.map((topicId) => (
        <SimpleTopic key={topicId} topicId={topicId} />
      ))}
    </div>
  );
};

const SimpleList = connect(mapStateToProps)(translate()(PureSimpleList));

export { PureSimpleList };
export default SimpleList;
