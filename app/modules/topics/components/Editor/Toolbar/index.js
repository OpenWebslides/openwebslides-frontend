// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Button, Icon, Menu } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { type AppState, type ModulesAction } from 'types/redux';
import contentItems from 'modules/contentItems';

import * as m from '../../../model';

type PassedProps = {|
  topic: m.Topic,
|};

type StateProps = {|
  currentlySelectedId: ?string,
|};

type DispatchProps = {|
  onInsertContentItem: (
    contentItemType: contentItems.model.ContentItemType,
    currentlySelectedId: ?string,
  ) => void,
|};

type Props = {| ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    currentlySelectedId: contentItems.selectors.getCurrentlySelectedId(state),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topic } = props;

  return {
    onInsertContentItem: (
      contentItemType: contentItems.model.ContentItemType,
      currentlySelectedId: ?string,
    ): void => {
      let context: contentItems.model.ContentItemContext;

      if (currentlySelectedId == null) {
        // Append to topic
        context = {
          contextType: contentItems.model.contextTypes.SUPER,
          contextItemId: topic.rootContentItemId,
          indexInSiblingItems: -1,
        };
      }
      else {
        // Insert after current selection
        context = {
          contextType: contentItems.model.contextTypes.SIBLING,
          contextItemId: currentlySelectedId,
        };
      }

      dispatch(contentItems.actions.add(
        contentItemType,
        context,
        // TODO: internationalization
        { text: 'Untitled heading' },
      ));
    },
  };
};

class PureToolbar extends React.Component<Props> {
  handleMouseDown = (event: SyntheticMouseEvent<HTMLElement>): void => {
    // Prevent blur event from being fired as a result of the mouse click
    // This prevents the active content item from being blurred
    event.preventDefault();
  };

  handleInsertHeading = (): void => {
    const { onInsertContentItem, currentlySelectedId } = this.props;
    onInsertContentItem(contentItems.model.contentItemTypes.HEADING, currentlySelectedId);
  };

  handleInsertParagraph = (): void => {
    const { onInsertContentItem, currentlySelectedId } = this.props;
    onInsertContentItem(contentItems.model.contentItemTypes.PARAGRAPH, currentlySelectedId);
  };

  handleInsertBlockquote = (): void => {
    const { onInsertContentItem, currentlySelectedId } = this.props;
    onInsertContentItem(contentItems.model.contentItemTypes.BLOCKQUOTE, currentlySelectedId);
  };

  render(): React.Node {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <div className="toolbar">
            <Menu secondary={true}>
              <Menu.Item fitted={true}>
                <Button.Group basic={true}>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.HEADING}`)}
                    onMouseDown={this.handleMouseDown}
                    onClick={this.handleInsertHeading}
                    data-test-id="toolbar-heading-button"
                  >
                    <Icon name="heading" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.PARAGRAPH}`)}
                    onMouseDown={this.handleMouseDown}
                    onClick={this.handleInsertParagraph}
                    data-test-id="toolbar-paragraph-button"
                  >
                    <Icon name="paragraph" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.LIST}`)}
                    disabled={true}
                  >
                    <Icon name="list ul" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.BLOCKQUOTE}`)}
                    onMouseDown={this.handleMouseDown}
                    onClick={this.handleInsertBlockquote}
                    data-test-id="toolbar-blockquote-button"
                  >
                    <Icon name="quote left" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.CODE}`)}
                    disabled={true}
                  >
                    <Icon name="code" />
                  </Button>
                </Button.Group>
              </Menu.Item>
              <Menu.Item fitted={true}>
                <Button.Group basic={true}>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.IMAGE}`)}
                    disabled={true}
                  >
                    <Icon name="image" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.VIDEO}`)}
                    disabled={true}
                  >
                    <Icon name="video" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.AUDIO}`)}
                    disabled={true}
                  >
                    <Icon name="music" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.IFRAME}`)}
                    disabled={true}
                  >
                    <Icon name="world" />
                  </Button>
                </Button.Group>
              </Menu.Item>
              <Menu.Item fitted={true}>
                <Button.Group basic={true}>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.COURSE_BREAK}`)}
                    disabled={true}
                  >
                    <Icon.Group>
                      <Icon name="file alternate outline" />
                      <Icon name="plus" corner="top right" />
                    </Icon.Group>
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:toolbarButtonForType.${contentItems.model.contentItemTypes.SLIDE_BREAK}`)}
                    disabled={true}
                  >
                    <Icon.Group>
                      <Icon name="image outline" />
                      <Icon name="plus" corner="top right" />
                    </Icon.Group>
                  </Button>
                </Button.Group>
              </Menu.Item>
            </Menu>
          </div>
        )}
      </Translation>
    );
  }
}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(PureToolbar);

export { PureToolbar };
export default Toolbar;
