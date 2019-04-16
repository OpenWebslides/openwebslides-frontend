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

const PureMarkdownToolbar = (props: Props): React.Node => {
  const { canIndent, canUnindent, onIndent, onUnindent } = props;

  return (
    <Translation>
      {(t: TFunction): React.Node => (
        <Menu secondary={true} className="markdown-toolbar">
          <Menu.Item fitted={true}>
            <Button.Group secondary={true} size="mini">
              <Button
                icon="bold"
                title={t('contentItems:markdown.strong')}
                disabled={true}
              />
              <Button
                icon="italic"
                title={t('contentItems:markdown.emphasis')}
                disabled={true}
              />
              <Button
                icon="code"
                title={t('contentItems:markdown.code')}
                disabled={true}
              />
              <Button
                icon="strikethrough"
                title={t('contentItems:markdown.strikethrough')}
                disabled={true}
              />
              <Button
                icon="linkify"
                title={t('contentItems:markdown.link')}
                disabled={true}
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
};

const MarkdownToolbar = connect(mapStateToProps, null)(PureMarkdownToolbar);

export { PureMarkdownToolbar };
export default MarkdownToolbar;
