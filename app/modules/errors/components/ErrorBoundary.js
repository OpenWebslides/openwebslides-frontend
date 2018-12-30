// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { type ModulesAction } from 'types/redux';

import actions from '../actions';

type PassedProps = {|
  children: React.Node,
|};

type DispatchProps = {|
  onLog: (error: Error) => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

type ComponentState = {|
  hasError: boolean,
|};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  return {
    onLog: (error: Error): void => {
      dispatch(actions.log(error));
    },
  };
};

class PureErrorBoundary extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    hasError: false,
  };

  static getDerivedStateFromError(/* error: Error */): ComponentState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error /* , info: { componentStack: string } */): void {
    const { onLog } = this.props;
    onLog(error);
  }

  render(): React.Node {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <h1>Something went wrong.</h1>
      );
    }
    else {
      return children;
    }
  }
}

const ErrorBoundary = connect(null, mapDispatchToProps)(PureErrorBoundary);

export { PureErrorBoundary };
export default ErrorBoundary;
