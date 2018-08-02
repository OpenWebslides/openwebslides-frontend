// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Button, Header } from 'semantic-ui-react';

import { type State } from 'types/state';
import { type Action } from 'types/action';
import { ObjectNotFoundError } from 'errors';
import contentItems from 'modules/contentItems';
import apiRequestsStatus from 'modules/apiRequestsStatus';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  topic: m.Topic,
|};

type DispatchProps = {|
  onSaveButtonClick: (string) => void,
  onLoadButtonClick: (string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const { ApiDimmer } = apiRequestsStatus.components;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;
  const topic = selectors.getById(state, { id: topicId });
  if (topic == null) throw new ObjectNotFoundError(`topics:topic`, topicId);

  return {
    topic,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    onSaveButtonClick: (id: string): void => {
      dispatch(actions.save(id));
    },
    onLoadButtonClick: (id: string): void => {
      dispatch(actions.load(id));
    },
  };
};

const ContentItemEditableDisplay = contentItems.components.EditableDisplay;

class PureEditor extends React.Component<Props> {
  onLoadButtonClick = (): void => {
    const { topicId, onLoadButtonClick } = this.props;
    onLoadButtonClick(topicId);
  };

  onSaveButtonClick = (): void => {
    const { topicId, onSaveButtonClick } = this.props;
    onSaveButtonClick(topicId);
  };

  // const {
  //   t,
  //   topicId,
  //   topic,
  //   onSaveButtonClick,
  //   onLoadButtonClick,
  // } = props;

  render = (): React.Node => {
    const { t, topic } = this.props;

    if (!topic) {
      this.onLoadButtonClick();

      return (
        <div>
          <ApiDimmer requestIds={['contentItems/API_GET_ALL_BY_TOPIC_ID']}>{t('editor:api.load.pending')}</ApiDimmer>
        </div>
      );
    }

    return (
      <div>
        <Header as="h1">{topic.title}</Header>

        <ApiDimmer requestIds={['contentItems/API_GET_ALL_BY_TOPIC_ID']}>{t('editor:api.load.pending')}</ApiDimmer>
        <ApiDimmer requestIds={['contentItems/API_GET_ALL_BY_TOPIC_ID']}>{t('editor:api.save.pending')}</ApiDimmer>

        <p>
          <Button primary={true} onClick={this.onSaveButtonClick}>
            {t('common:button.save')}
          </Button>
          <Button onClick={this.onLoadButtonClick}>
            Load
          </Button>
        </p>

        <ContentItemEditableDisplay contentItemId={topic.rootContentItemId} />
      </div>
    );
  }
}

const Editor = connect(mapStateToProps, mapDispatchToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;