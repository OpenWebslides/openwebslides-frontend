// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import FlashMessages from 'core-components/flash/FlashMessages';

import { Button, Header } from 'semantic-ui-react';

import contentItems from 'modules/contentItems';
import api from 'modules/api';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Topic } from '../model';
import { getById } from '../selectors';
import { save, load } from '../actions';
import {
  API_GET_CONTENT,
  API_PATCH_CONTENT,
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

class PureEditor extends React.Component<Props> {
  onLoadButtonClick = (): void => {
    this.props.onLoadButtonClick(this.props.topicId);
  }

  onSaveButtonClick = (): void => {
    this.props.onSaveButtonClick(this.props.topicId);
  }

  // const {
  //   t,
  //   topicId,
  //   topic,
  //   onSaveButtonClick,
  //   onLoadButtonClick,
  // } = props;

  render = (): React.Node => {
    const {
      t,
      topic,
    } = this.props;

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
        <Header as="h1">{this.props.topic.title}</Header>

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
