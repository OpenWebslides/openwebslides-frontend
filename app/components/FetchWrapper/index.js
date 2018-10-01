// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { type ModulesAction, type AppState } from 'types/redux';

type PassedProps<T> = {|
  // Render prop. See https://reactjs.org/docs/render-props.html
  render: (T) => React.Node,
  // We need to pass in any props and state that the render prop uses,
  // otherwise it won't re-render when necessary.
  renderPropsAndState: {},
  // The id that will be passed to fetchAction and fetchedPropSelector.
  fetchId: string,
  // An action that fetches the item with id fetchId from the api and sets it in the state.
  fetchAction: (id: string) => ModulesAction,
  // A selector that returns the fetchedProp when it is present in the state, or NULL otherwise.
  fetchedPropSelector: (state: AppState, { id: string }) => T,
  // The condition for calling fetchAction; defaults to (fetchedProp == NULL).
  // Note: this should actually not be optional, since it has a default,  but flow doesn't seem to
  // correctly interpret the defaultProps (perhaps because of the <T>), so we make this optional
  // so that we only need one a single flowfixme.
  fetchCondition?: (fetchedProp: ?T) => boolean,
|};

type StateProps<T> = {|
  fetchedProp: ?T,
|};

type DispatchProps = {|
  fetch: () => void,
|};

type Props<T> = {| ...PassedProps<T>, ...StateProps<T>, ...DispatchProps |};

const mapStateToProps = <T>(
  state: AppState, props: PassedProps<T>,
): StateProps<T> => {
  const { fetchId, fetchedPropSelector } = props;

  return {
    fetchedProp: fetchedPropSelector(state, { id: fetchId }),
  };
};

const mapDispatchToProps = <T>(
  dispatch: Dispatch<ModulesAction>, props: PassedProps<T>,
): DispatchProps => {
  const { fetchAction, fetchId } = props;

  return {
    fetch: (): void => {
      dispatch(fetchAction(fetchId));
    },
  };
};

class PureFetchWrapper<T> extends React.Component<Props<T>> {
  static defaultProps = {
    fetchCondition: (fetchedProp: ?T): boolean => (fetchedProp == null),
  };

  componentDidMount(): void {
    const { fetchedProp, fetchCondition, fetch } = this.props;
    // $FlowFixMe see note on PassedProps above
    if (fetchCondition(fetchedProp)) fetch();
  }

  render(): React.Node {
    const { fetchedProp, render } = this.props;
    return (fetchedProp == null) ? null : render(fetchedProp);
  }
}

const FetchWrapper = connect(mapStateToProps, mapDispatchToProps)(PureFetchWrapper);

export { PureFetchWrapper };
export default FetchWrapper;
