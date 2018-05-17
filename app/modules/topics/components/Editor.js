// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FlashMessages from 'core-components/flash/FlashMessages';

import { Button, Header } from 'semantic-ui-react';

import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import contentItems from 'modules/content-items';
import api from 'modules/api';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Topic } from '../model';
import { getById } from '../selectors';
import { save, load } from '../actions';
import {
  API_GET_TOPIC_CONTENT,
  API_PATCH_TOPIC_CONTENT,
} from '../actionTypes';

const { ApiDimmer } = api.components;

type DispatchProps = {
  onSaveButtonClick: (Identifier) => void,
  onLoadButtonClick: (Identifier) => void,
};

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  topic: Topic,
};

type Props = CustomTranslatorProps & DispatchProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const topic = getById(state, { id: props.topicId });

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

const PureEditor = (props: Props): React.Node => {
  const {
    t,
    topicId,
    topic,
    onSaveButtonClick,
    onLoadButtonClick,
  } = props;

  if (!topic) {
    onLoadButtonClick(topicId);

    return (
      <div>
        <ApiDimmer request={API_GET_TOPIC_CONTENT}>{t('editor:api.load.pending')}</ApiDimmer>
      </div>
    );
  }

  return (
    <div>
      <Header as="h1">{topic.title}</Header>

      <FlashMessages />

      <ApiDimmer request={API_GET_TOPIC_CONTENT}>{t('editor:api.load.pending')}</ApiDimmer>
      <ApiDimmer request={API_PATCH_TOPIC_CONTENT}>{t('editor:api.save.pending')}</ApiDimmer>

      <p>
        <Button primary={true} onClick={() => onSaveButtonClick(topic.id)}>
          {t('common:button.save')}
        </Button>
        <Button onClick={() => onLoadButtonClick(topic.id)}>
          Load
        </Button>
      </p>

      <Link to="/tempslidetest">Temp slide test page</Link>
      { /* $FlowFixMe See: https://github.com/facebook/flow/issues/4644 */ }
      <ContentItemEditableDisplay contentItemId={topic.rootContentItemId} />
    </div>
  );
};

const Editor = connect(mapStateToProps, mapDispatchToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;
