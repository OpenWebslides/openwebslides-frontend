// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
import { Button, Menu } from 'semantic-ui-react';

import { type AppState } from 'types/redux';
import { type TFunction } from 'types/i18next';
import contentItems from 'modules/contentItems';

type PassedProps = {|
  contentItemId: ?string,
  onIndent: () => void,
  onUnindent: () => void,
  onEdit: (prefix: string, suffix: string) => void,
|};

type StateProps = {|
  canIndent: boolean,
  canUnindent: boolean,
|};

type Props = {| ...PassedProps, ...StateProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { contentItemId } = props;

  return {
    canIndent: contentItems.selectors.canIndent(state, { id: contentItemId }),
    canUnindent: contentItems.selectors.canUnindent(state, { id: contentItemId }),
  };
};

class PureMarkdownToolbar extends React.Component<Props> {
  handleStrong = (): void => {
    const { onEdit } = this.props;
    onEdit('**', '**');
  };

  handleEmphasis = (): void => {
    const { onEdit } = this.props;
    onEdit('_', '_');
  };

  handleCode = (): void => {
    const { onEdit } = this.props;
    onEdit('`', '`');
  };

  handleStrikethrough = (): void => {
    const { onEdit } = this.props;
    onEdit('~~', '~~');
  };

  handleLink = (): void => {
    const { onEdit } = this.props;
    onEdit('[', '](url)');
  };

  render(): React.Node {
    const { canIndent, canUnindent, onIndent, onUnindent } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Menu secondary={true} className="markdown-toolbar">
            <Menu.Item fitted={true}>
              <Button.Group secondary={true} size="mini">
                <Button
                  icon="bold"
                  title={t('contentItems:markdown.strong')}
                  onClick={this.handleStrong}
                  data-test-id="markdown-toolbar-strong-button"
                />
                <Button
                  icon="italic"
                  title={t('contentItems:markdown.emphasis')}
                  onClick={this.handleEmphasis}
                  data-test-id="markdown-toolbar-emphasis-button"
                />
                <Button
                  icon="code"
                  title={t('contentItems:markdown.code')}
                  onClick={this.handleCode}
                  data-test-id="markdown-toolbar-code-button"
                />
                <Button
                  icon="strikethrough"
                  title={t('contentItems:markdown.strikethrough')}
                  onClick={this.handleStrikethrough}
                  data-test-id="markdown-toolbar-strikethrough-button"
                />
                <Button
                  icon="linkify"
                  title={t('contentItems:markdown.link')}
                  onClick={this.handleLink}
                  data-test-id="markdown-toolbar-link-button"
                />
              </Button.Group>
            </Menu.Item>
            <Menu.Item fitted={true}>
              <Button.Group secondary={true} size="mini">
                <Button
                  icon="outdent"
                  title={t('contentItems:structure.unindent')}
                  onClick={onUnindent}
                  data-test-id="markdown-toolbar-unindent-button"
                  disabled={!canUnindent}
                />
                <Button
                  icon="indent"
                  title={t('contentItems:structure.indent')}
                  onClick={onIndent}
                  data-test-id="markdown-toolbar-indent-button"
                  disabled={!canIndent}
                />
              </Button.Group>
            </Menu.Item>
          </Menu>
        )}
      </Translation>
    );
  }
}

const MarkdownToolbar = connect(mapStateToProps, null)(PureMarkdownToolbar);

export { PureMarkdownToolbar };
export default MarkdownToolbar;
