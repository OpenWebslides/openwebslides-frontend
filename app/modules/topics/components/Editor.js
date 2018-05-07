// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header, Grid, Button, Icon } from 'semantic-ui-react';


import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import contentItems, { contentItemTypes } from 'modules/content-items';
import type { DenormalizedRootContentItem } from 'modules/content-items';
import editor from 'modules/editor';

import Slide from 'core-components/slides/Slide';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { Topic } from '../model';
import { getById } from '../selectors';


const { Sidebar } = editor.components;

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  topic: Topic,
  // Slide takes a denormalized root contentItem instead of a root contentItem id, because in a
  // later stage the contentItem tree passed to the slide needs to be transformed further
  // (for example, by splitting up sections and inserting repeated headers if a section is longer
  // than a single slide) and the contentItem tree can't just be extracted from the state directly.
  contentItemTreeRootItem: DenormalizedRootContentItem,
};

type Props = CustomTranslatorProps & PassedProps & StateProps;

type LocalState = {
  editorWidth: number,
  collapsibleWidth: number,
  collapsibleIsCollapsed: boolean,
};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const topic = getById(state, { id: props.topicId });

  if (topic == null) {
    throw new ObjectNotFoundError('topics:topic', props.topicId);
  }

  const contentItemTreeRootItemId = 'qyrgv0bcd6'; // 'w4lg2u0p1h'; // #TODO stub
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

class PureEditor extends React.Component<Props, LocalState> {
  // TODO
  // eslint-disable-next-line flowtype/require-return-type
  constructor(props: Props) {
    super(props);

    this.state = {
      editorWidth: 15,
      collapsibleWidth: 0,
      collapsibleIsCollapsed: true,
    };
  }

  toggleCollapsible = (): void => {
    if (this.state.collapsibleIsCollapsed) {
      this.setState({ editorWidth: 9 });
      this.setState({ collapsibleWidth: 6 });
    }
    else {
      this.setState({ editorWidth: 15 });
      this.setState({ collapsibleWidth: 0 });
    }

    this.setState({ collapsibleIsCollapsed: !this.state.collapsibleIsCollapsed });
  };

  render = (): React.Node => {
    const {
      topic,
      contentItemTreeRootItem,
    } = this.props;

    return (
      <React.Fragment>
        <Header as="h1">{topic.title}</Header>
        <Link to="/tempslidetest">Temp slide test page</Link>
        {/* $FlowFixMe See: https://github.com/facebook/flow/issues/4644 */}
        <Grid>
          <Grid.Row>
            <Grid.Column width={this.state.editorWidth}>
              <ContentItemEditableDisplay contentItemId={topic.rootContentItemId} />
            </Grid.Column>
            { !this.state.collapsibleIsCollapsed &&
              <Grid.Column className="editor__sidebar" width={this.state.collapsibleWidth}>
                <Slide contentItemTreeRootItem={contentItemTreeRootItem} />
              </Grid.Column>
            }
            <Grid.Column className="editor__sidemenu" width={1} >
              <Sidebar>
                <Button
                  as="span"
                  primary={true}
                  onClick={this.toggleCollapsible}
                >
                  <Icon name="image" className="editor__sidemenu__icon" />
                </Button>
              </Sidebar>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const Editor = connect(mapStateToProps)(translate()(PureEditor));

export { PureEditor };
export default Editor;
