// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';

import FlashMessages from 'core-components/flash/FlashMessages';
import contentItems from 'modules/contentItems';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Topic } from '../model';
import { getById } from '../selectors';
import { save, load } from '../actions';
import {
  API_GET_CONTENT,
  API_PATCH_CONTENT,
} from '../actionTypes';

const { ApiDimmer } = apiRequestsStatus.components;

type PassedProps = {|
  topicId: Identifier,
|};

type StateProps = {|
  topic: Topic,
|};

type DispatchProps = {|
  onSaveButtonClick: (Identifier) => void,
  onLoadButtonClick: (Identifier) => void,
|};

type Props = {|
  ...TranslatorProps,
  ...PassedProps,
  ...StateProps,
  ...DispatchProps,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;
  const topic = getById(state, { id: topicId });

  return {
    topic,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onSaveButtonClick: (id: Identifier): void => {
      dispatch(save(id));
    },
    onLoadButtonClick: (id: Identifier): void => {
      dispatch(load(id));
    },
  };
};

const ContentItemEditableDisplay = contentItems.components.EditableDisplay;

class PureEditor extends React.Component<Props> {
  onLoadButtonClick = (): void => {
    const { topic, onLoadButtonClick } = this.props;
    onLoadButtonClick(topic.id);
  };

  onSaveButtonClick = (): void => {
    const { topic, onSaveButtonClick } = this.props;
    onSaveButtonClick(topic.id);
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
          <ApiDimmer request={API_GET_CONTENT}>{t('editor:api.load.pending')}</ApiDimmer>
        </div>
      );
    }

    return (
      <div>
        <Header as="h1">{topic.title}</Header>

        <FlashMessages />

        <ApiDimmer request={API_GET_CONTENT}>{t('editor:api.load.pending')}</ApiDimmer>
        <ApiDimmer request={API_PATCH_CONTENT}>{t('editor:api.save.pending')}</ApiDimmer>

        <p>
          <Button primary={true} onClick={this.onSaveButtonClick}>
            {t('common:button.save')}
          </Button>
          <Button onClick={this.onLoadButtonClick}>
            Load
          </Button>
        </p>

        <Link to="/tempslidetest">Temp slide test page</Link>
        <ContentItemEditableDisplay contentItemId={topic.rootContentItemId} />
      </div>
    );
  }
}

const Editor = connect(mapStateToProps, mapDispatchToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;
