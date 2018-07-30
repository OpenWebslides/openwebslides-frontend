// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { type State } from 'types/state';
import { type Action } from 'types/action';

type PassedProps<T> = {|
  render: (T) => React.Node,
  fetchId: string,
  fetchAction: (id: string) => Action,
  fetchedPropSelector: (state: State, { id: string }) => T,
|};

type StateProps<T> = {|
  fetchedProp: ?T,
|};

type DispatchProps = {|
  fetch: () => void,
|};

type Props<T> = {| ...PassedProps<T>, ...StateProps<T>, ...DispatchProps |};

const mapStateToProps = <T>(
  state: State, props: PassedProps<T>,
): StateProps<T> => {
  const { fetchId, fetchedPropSelector } = props;

  return {
    fetchedProp: fetchedPropSelector(state, { id: fetchId }),
  };
};

const mapDispatchToProps = <T>(
  dispatch: Dispatch<Action>, props: PassedProps<T>,
): DispatchProps => {
  const { fetchAction, fetchId } = props;

  return {
    fetch: (): void => {
      dispatch(fetchAction(fetchId));
    },
  };
};

class PureFetchWrapper<T> extends React.Component<Props<T>> {
  componentDidMount(): void {
    const { fetchedProp, fetch } = this.props;
    if (fetchedProp == null) fetch();
  }

  render(): React.Node {
    const { fetchedProp, render } = this.props;
    return (fetchedProp == null) ? null : render(fetchedProp);
  }
}

const FetchWrapper = connect(mapStateToProps, mapDispatchToProps)(PureFetchWrapper);

export { PureFetchWrapper };
export default FetchWrapper;