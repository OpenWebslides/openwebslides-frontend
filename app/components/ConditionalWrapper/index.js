// @flow

/**
 * Conditonally renders it children, an alternative component or a react-router redirect.
 */

import * as React from 'react';
import { withRouter, Redirect, type ContextRouter as RouterProps } from 'react-router-dom';

type PassedProps = {|
  children: React.Node,
  // TRUE if children should be rendered, FALSE if not.
  renderChildren: boolean,
  // Optional component that will be rendered instead of the children, if renderChildren=FALSE.
  componentIfNotChildren: ?React.ComponentType<{}>,
  // Optional route to which the user will be redirected, if renderChildren=FALSE.
  redirectIfNotChildren: ?string,
|};

type Props = {| ...RouterProps, ...PassedProps |};

const PureConditionalWrapper = (props: Props): React.Node => {
  const {
    children,
    renderChildren,
    componentIfNotChildren: ComponentIfNotChildren,
    redirectIfNotChildren,
  } = props;

  if (renderChildren) {
    return children;
  }
  else if (redirectIfNotChildren != null) {
    return <Redirect to={redirectIfNotChildren} />;
  }
  else if (ComponentIfNotChildren != null) {
    return <ComponentIfNotChildren />;
  }
  else {
    return null;
  }
};

PureConditionalWrapper.defaultProps = {
  componentIfNotChildren: null,
  redirectIfNotChildren: null,
};

const ConditionalWrapper = withRouter(PureConditionalWrapper);

export { PureConditionalWrapper };
export default ConditionalWrapper;
