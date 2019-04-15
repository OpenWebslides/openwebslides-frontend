// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Button, Menu } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';

type PassedProps = {|
  onIndent: () => void,
  onUnindent: () => void,
|};

type Props = {| ...PassedProps |};

const PureMarkdownToolbar = (props: Props): React.Node => {
  const { onIndent, onUnindent } = props;

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
              />
              <Button
                icon="indent"
                title={t('contentItems:structure.indent')}
                onClick={onIndent}
                data-test-id="markdown-toolbar-indent-button"
              />
            </Button.Group>
          </Menu.Item>
        </Menu>
      )}
    </Translation>
  );
};

const MarkdownToolbar = PureMarkdownToolbar;

export { PureMarkdownToolbar };
export default MarkdownToolbar;
