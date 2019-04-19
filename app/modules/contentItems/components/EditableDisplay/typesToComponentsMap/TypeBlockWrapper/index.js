// @flow

import * as React from 'react';
import { Icon } from 'semantic-ui-react';

type PassedProps = {|
  onFocus: (event: SyntheticFocusEvent<HTMLElement>) => void,
  onBlur: (event: SyntheticFocusEvent<HTMLElement>) => void,
  iconName: string,
  isSelected: boolean,
  children?: React.Node,
|};

type Props = {| ...PassedProps |};

class PureTypeBlockWrapper extends React.Component<Props> {
  static defaultProps = {
    children: null,
  };

  componentDidUpdate(): void {
    const { isSelected } = this.props;

    if (this.blockRef == null) return;

    if (isSelected) this.blockRef.focus();
    else this.blockRef.blur();
  }

  handleRef = (c: ?HTMLDivElement): void => {
    this.blockRef = c;
  };

  blockRef: ?HTMLDivElement;

  render(): React.Node {
    const { isSelected, onFocus, onBlur, iconName, children } = this.props;

    return (
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      <div
        className={`content-item-editable-display-block ${isSelected ? 'content-item-editable-display-block--selected' : ''}`}
        role="link"
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={this.handleRef}
        data-test-id="type-block-wrapper"
      >
        <div className="content-item-editable-display-block__wrapper">
          <div className="content-item-editable-display-block__icon">
            <Icon name={iconName} color="grey" />
          </div>
          <div className="content-item-editable-display-block__content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

const TypeBlockWrapper = PureTypeBlockWrapper;

export { PureTypeBlockWrapper };
export default TypeBlockWrapper;
