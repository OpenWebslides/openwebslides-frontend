// @flow

import * as React from 'react';
import { Icon } from 'semantic-ui-react';

type PassedProps = {|
  iconName: string,
  isSelected: boolean,
  children?: React.Node,
|};

type Props = {| ...PassedProps |};

const PureTypeBlockWrapper = (props: Props): React.Node => {
  const { iconName, isSelected, children } = props;

  return (
    <div className={`content-item-editable-display-block ${isSelected ? 'content-item-editable-display-block--selected' : ''}`}>
      <div className="content-item-editable-display-block__wrapper">
        <div className="content-item-editable-display-block__icon">
          <Icon name={iconName} color="grey" />
        </div>
        <div className="content-item-editable-display-block__content">
          { children }
        </div>
      </div>
    </div>
  );
};

PureTypeBlockWrapper.defaultProps = {
  children: null,
};

const TypeBlockWrapper = PureTypeBlockWrapper;

export { PureTypeBlockWrapper };
export default TypeBlockWrapper;
