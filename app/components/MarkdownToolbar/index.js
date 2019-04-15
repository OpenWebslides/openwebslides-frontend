// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Button, Icon, Menu } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { type ModulesAction } from 'types/redux';

type PassedProps = {|
|};

type DispatchProps = {|
|};

type Props = {| ...PassedProps, ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  return {};
};

class PureMarkdownToolbar extends React.Component<Props> {
  render(): React.Node {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <div style={{ position: 'relative' }}>
            <Menu secondary={true} className="markdown-toolbar">
              <Menu.Item fitted={true}>
                <Button.Group secondary={true} size="mini">
                  <Button
                    icon={true}
                    title={t(`contentItems:markdown.strong`)}
                    disabled={true}
                  >
                    <Icon name="bold" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:markdown.emphasis`)}
                    disabled={true}
                  >
                    <Icon name="italic" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:markdown.code`)}
                    disabled={true}
                  >
                    <Icon name="code" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:markdown.strikethrough`)}
                    disabled={true}
                  >
                    <Icon name="strikethrough" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:markdown.link`)}
                    disabled={true}
                  >
                    <Icon name="linkify" />
                  </Button>
                </Button.Group>
              </Menu.Item>
              <Menu.Item fitted={true}>
                <Button.Group secondary={true} size="mini">
                  <Button
                    icon={true}
                    title={t(`contentItems:structure.unindent`)}
                    disabled={true}
                  >
                    <Icon name="outdent" />
                  </Button>
                  <Button
                    icon={true}
                    title={t(`contentItems:structure.indent`)}
                    disabled={true}
                  >
                    <Icon name="indent" />
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

const MarkdownToolbar = connect(null, mapDispatchToProps)(PureMarkdownToolbar);

export { PureMarkdownToolbar };
export default MarkdownToolbar;
