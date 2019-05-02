// @flow

import * as React from 'react';
import { Icon } from 'semantic-ui-react';

type PassedProps = {|
  contentItemId: string,
  isSelected: boolean,
  iconName: string,
  onFocus: (id: string) => void,
  onBlur: () => void,
  children?: React.Node,
|};

type ComponentState = {|
  isHovering: boolean,
|};

type Props = {| ...PassedProps |};

class PureTypeBlockWrapper extends React.Component<Props, ComponentState> {
  static defaultProps = {
    children: null,
  };

  state: ComponentState = {
    isHovering: false,
  };

  handleFocus = (): void => {
    const { contentItemId, onFocus } = this.props;
    onFocus(contentItemId);
  };

  handleBlur = (): void => {
    const { onBlur } = this.props;
    onBlur();
  };

  handleMouseEnter = (): void => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = (): void => {
    this.setState({ isHovering: false });
  };

  render(): React.Node {
    const { contentItemId, isSelected, iconName, children } = this.props;
    const { isHovering } = this.state;

    return (
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      <div
        className={`content-item-editable-display-block ${isSelected ? 'content-item-editable-display-block--selected' : ''}`}
        role="link"
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        data-test-id="type-block-wrapper"
      >
        <div className="content-item-editable-display-block__wrapper">
          <div className="content-item-editable-display-block__icon">
            {isHovering ? (
              <Icon name="bars" color="grey" />
            ) : (
              <Icon name={iconName} color="grey" />
            )}
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
