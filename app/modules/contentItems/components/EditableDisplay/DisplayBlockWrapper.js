// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';

import { Icon } from 'semantic-ui-react';

type PassedProps = {
  iconName: string,
  children?: React.Node,
  baseClassName: string,
};

type Props = CustomTranslatorProps & PassedProps;

const PureDisplayBlockWrapper = (props: Props): React.Node => {
  const { iconName, children, baseClassName } = props;
  const blockClassName = `${baseClassName}-block`;

  return (
    <div className={`${blockClassName}`}>
      <div className={`${blockClassName}__wrapper`}>
        <div className={`${blockClassName}__icon`}>
          <Icon name={iconName} color="grey" />
        </div>
        <div className={`${blockClassName}__content`}>
          { children }
        </div>
      </div>
    </div>
  );
};

PureDisplayBlockWrapper.defaultProps = {
  children: null,
};

const DisplayBlockWrapper = translate()(PureDisplayBlockWrapper);

export { PureDisplayBlockWrapper };
export default DisplayBlockWrapper;
