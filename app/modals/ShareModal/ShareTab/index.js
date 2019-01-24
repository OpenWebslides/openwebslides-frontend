// @flow

import * as React from 'react';
import { Input } from 'semantic-ui-react';

import CopyButton from '../CopyButton';

type PassedProps = {|
  value: string,
|};

type Props = {| ...PassedProps |};

class ShareTab extends React.Component<Props> {
  handleOnFocusSelect = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    e.target.select();
  };

  render(): React.Node {
    const { value } = this.props;

    return (
      <Input
        icon="eye"
        iconPosition="left"
        fluid={true}
        readOnly={true}
        value={value}
        onFocus={this.handleOnFocusSelect}
        action={<CopyButton value={value} />}
        data-test-id="share-tab-input"
      />
    );
  }
}

export default ShareTab;
