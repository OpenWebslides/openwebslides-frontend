// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Button, Popup } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

import { type TFunction } from 'types/i18next';

type PassedProps = {|
  value: string,
|};

type Props = {| ...PassedProps |};

class PureCopyButton extends React.Component<Props> {
  handleOnCopy = (): void => {
    const { value } = this.props;
    copy(value);
  };

  render(): React.Node {
    return (
      <Translation>
        {(t: TFunction): React.Node => (
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
        )}
      </Translation>
    );
  }
}

const CopyButton = PureCopyButton;

export { PureCopyButton };
export default CopyButton;
