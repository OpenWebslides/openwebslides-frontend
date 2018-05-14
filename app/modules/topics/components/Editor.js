// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header } from 'semantic-ui-react';

import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

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

type Props = CustomTranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const topic = getById(state, { id: props.topicId });

  if (topic == null) {
    throw new ObjectNotFoundError('topics:topic', props.topicId);
  }

  return {
    topic,
  };
};

const ContentItemEditableDisplay = contentItems.components.EditableDisplay;

const PureEditor = (props: Props): React.Node => {
  const { topic } = props;

  return (
    <div>
      <Header as="h1">{topic.title}</Header>
      <Link to="/tempslidetest">Temp slide test page</Link>
      { /* $FlowFixMe See: https://github.com/facebook/flow/issues/4644 */ }
      <ContentItemEditableDisplay contentItemId={topic.rootContentItemId} />
    </div>
  );
};

const Editor = connect(mapStateToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;
