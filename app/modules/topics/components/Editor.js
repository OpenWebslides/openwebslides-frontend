// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { connect } from 'react-redux';

import { Header } from 'semantic-ui-react';

import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import contentItems, { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';
import Slide from 'core-components/slides/Slide';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Topic } from '../model';
import { getById } from '../selectors';

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  topic: Topic,
  contentItemTreeRootItem: DenormalizedRootContentItem,
};

type Props = CustomTranslatorProps & PassedProps & StateProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const topic = getById(state, { id: props.topicId });

  if (topic == null) {
    throw new ObjectNotFoundError('topics:topic', props.topicId);
  }

  const contentItemTreeRootItemId = topic.rootContentItemId;
  const contentItemTreeRootItem = contentItems.selectors.getDenormalizedById(
    state,
    { id: contentItemTreeRootItemId },
  );

  if (contentItemTreeRootItem == null) {
    throw new Error(`ContentItem with id "${contentItemTreeRootItemId}" could not be found.`);
  }
  else if (contentItemTreeRootItem.type !== contentItemTypes.ROOT) {
    throw new Error('Not a ROOT contentItem.');
  }

  return {
    topic,
    contentItemTreeRootItem,
  };
};

const ContentItemEditableDisplay = contentItems.components.EditableDisplay;

const PureEditor = (props: Props): React.Node => {
  const { topic, contentItemTreeRootItem } = props;

  return (
    <div>
      <Header as="h1">{topic.title}</Header>
      <div style={{ display: 'table', width: '100%' }}>
        <div style={{ display: 'table-cell', paddingRight: '1em', verticalAlign: 'top' }}>
          { /* $FlowFixMe See: https://github.com/facebook/flow/issues/4644 */ }
          <ContentItemEditableDisplay contentItemId={topic.rootContentItemId} />
        </div>
        <div style={{ display: 'table-cell', paddingLeft: '1em', verticalAlign: 'top' }}>
          <div style={{ marginTop: '1em' }}>
            <div style={{ fontSize: '0.7em' }}>
              <Slide contentItemTreeRootItem={contentItemTreeRootItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Editor = connect(mapStateToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;
