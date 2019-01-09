// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Button, Popup } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

type PassedProps = {|
  value: string,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureCopyButton extends React.Component<Props> {
  handleOnCopy = (): void => {
    const { value } = this.props;

    copy(value);
  };

  render(): React.Node {
    const { t } = this.props;

    return (
      <Popup
        trigger={(
          <Button
            primary={true}
            icon="copy"
            onClick={this.handleOnCopy}
            data-test-id="copy-button"
          />
        )}
        content={t('common:copied')}
        inverted={true}
        on="click"
        size="mini"
      />
    );
  }
}

const CopyButton = withNamespaces()(PureCopyButton);

export { PureCopyButton };
export default CopyButton;
