// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Button, Icon, Menu } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { type ModulesAction } from 'types/redux';
import contentItems from 'modules/contentItems';

import actions from '../../../actions';
import * as m from '../../../model';

type PassedProps = {|
  topic: m.Topic,
|};

type DispatchProps = {|
  onUpdate: (title: ?string, description: ?string, access: ?m.AccessType) => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topic } = props;

  return {
    onUpdate: (title: ?string, description: ?string, access: ?m.AccessType): void => {
      dispatch(actions.update(topic.id, title, description, access));
    },
  };
};

class PureToolbar extends React.Component<Props> {
  render(): React.Node {
    const { topic } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Menu secondary={true}>
            <Menu.Item fitted={true}>
              <Button.Group basic={true} style={{ marginRight: '1em' }}>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.HEADING}`)}
                >
                  <Icon name="heading" />
                </Button>
                <Button
                  icon={true}
                  title={t(`contentItems:contentItemForType.${contentItems.model.contentItemTypes.PARAGRAPH}`)}
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
            <Menu.Item>
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
            <Menu.Item>
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
