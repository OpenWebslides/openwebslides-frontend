// @flow

import _ from 'lodash';
import * as React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Button } from 'semantic-ui-react';

import type { State } from 'types/state';
import { add, edit, remove } from '../actions';

import Preview from './Preview';

type PassedProps = {
  topicIds: Array<string>,
};

type StateProps = {
  lastTopicId: ?string,
};

type DispatchProps = {
  onAddButtonClick: () => void,
  onEditButtonClick: (string) => void,
  onRemoveButtonClick: (string) => void,
};

type Props = TranslatorProps & PassedProps & StateProps & DispatchProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const lastTopicId = (props.topicIds.length > 0) ? _.last(props.topicIds) : null;

  return {
    lastTopicId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onAddButtonClick: (): void => {
      dispatch(
        add('New topic title', 'New topic description bla bla bla bla...'),
      );
    },
    onEditButtonClick: (id: string): void => {
      dispatch(
        edit(id, 'Edited topic title', 'Edited topic description bla bla bla bla...'),
      );
    },
    onRemoveButtonClick: (id: string): void => {
      dispatch(
        remove(id),
      );
    },
  };
};

const List = (props: Props): React.Node => {
  const {
    t,
    topicIds,
    lastTopicId,
    onAddButtonClick,
    onEditButtonClick,
    onRemoveButtonClick,
  } = props;

  return (
    <div>
      {topicIds.map((topicId) => (
        <Preview key={topicId} topicId={topicId} />
      ))}
      <p>
        <Button onClick={onAddButtonClick}>{t('common:button.add')}</Button>
        {lastTopicId && (
          <span>
            <Button onClick={() => onEditButtonClick(lastTopicId)}>{t('common:button.edit')}</Button>
            <Button onClick={() => onRemoveButtonClick(lastTopicId)}>{t('common:button.remove')}</Button>
          </span>
        )}
      </p>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(List));
