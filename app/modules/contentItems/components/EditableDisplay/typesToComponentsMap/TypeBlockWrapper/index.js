// @flow

import * as React from 'react';
import { Icon } from 'semantic-ui-react';

type PassedProps = {|
  contentItemId: string,
  isSelected: boolean,
  iconName: string,
  onFocus: (id: string, event: SyntheticFocusEvent<HTMLElement>) => void,
  onBlur: (id: string, event: SyntheticFocusEvent<HTMLElement>) => void,
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

  handleFocus = (event: SyntheticFocusEvent<HTMLElement>): void => {
    const { contentItemId, onFocus } = this.props;
    onFocus(contentItemId, event);
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLElement>): void => {
    const { contentItemId, onBlur } = this.props;
    onBlur(contentItemId, event);
  };

  handleRef = (c: ?HTMLDivElement): void => {
    this.blockRef = c;
  };

  blockRef: ?HTMLDivElement;

  render(): React.Node {
    const { isSelected, iconName, children } = this.props;

    return (
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      <div
        className={`content-item-editable-display-block ${isSelected ? 'content-item-editable-display-block--selected' : ''}`}
        role="link"
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
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
