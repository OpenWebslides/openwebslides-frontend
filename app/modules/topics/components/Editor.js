// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react';

import contentItems from 'modules/content-items';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Topic } from '../model';
import { getById } from '../selectors';

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  topic: Topic,
};

type Props = TranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const topic = getById(state, props.topicId);

  if (topic === null) {
    throw new Error(`Topic with id "${props.topicId}" could not be found.`);
  }

  return {
    topic,
  };
};

const ContentItemsEditorRoot = contentItems.components.EditorRoot;

const PureEditor = (props: Props): React.Node => {
  const { topic } = props;

  return (
    <div>
      <Header as="h1">{topic.title}</Header>
      <ContentItemsEditorRoot rootContentItemId={topic.rootContentItemId} />
    </div>
  );
};

const Editor = connect(mapStateToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;
