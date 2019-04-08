// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Button, Icon, Menu } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { type ModulesAction } from 'types/redux';
import contentItems from 'modules/contentItems';

import * as m from '../../../model';

type PassedProps = {|
  topic: m.Topic,
|};

type DispatchProps = {|
  onInsertContentItem: (contentItemType: contentItems.model.ContentItemType) => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topic } = props;

  return {
    onInsertContentItem: (contentItemType: contentItems.model.ContentItemType): void => {
      dispatch(contentItems.actions.add(
        contentItemType,
        { contextType: contentItems.model.contextTypes.PARENT,
          contextItemId: topic.rootContentItemId,
          indexInSiblingItems: -1,
        },
        { text: 'Untitled heading' },
      ));
    },
  };
};

class PureToolbar extends React.Component<Props> {
  handleInsertHeading = (): void => {
    const { onInsertContentItem } = this.props;
    onInsertContentItem(contentItems.model.contentItemTypes.HEADING);
  };

  render(): React.Node {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Menu secondary={true}>
            <Menu.Item fitted={true}>
              <Button.Group basic={true}>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.HEADING}`)}
                  onClick={this.handleInsertHeading}
                  data-test-id="toolbar-heading-button"
                >
                  <Icon name="heading" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.PARAGRAPH}`)}
                  disabled={true}
                >
                  <Icon name="paragraph" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.LIST}`)}
                  disabled={true}
                >
                  <Icon name="list ul" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.BLOCKQUOTE}`)}
                  disabled={true}
                >
                  <Icon name="quote left" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.CODE}`)}
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
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.IMAGE}`)}
                  disabled={true}
                >
                  <Icon name="image" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.VIDEO}`)}
                  disabled={true}
                >
                  <Icon name="video" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.AUDIO}`)}
                  disabled={true}
                >
                  <Icon name="music" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.IFRAME}`)}
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
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.COURSE_BREAK}`)}
                  disabled={true}
                >
                  <Icon.Group>
                    <Icon name="file alternate outline" />
                    <Icon name="plus" corner="top right" />
                  </Icon.Group>
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.SLIDE_BREAK}`)}
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
        )}
      </Translation>
    );
  }
}

const Toolbar = connect(null, mapDispatchToProps)(PureToolbar);

export { PureToolbar };
export default Toolbar;
