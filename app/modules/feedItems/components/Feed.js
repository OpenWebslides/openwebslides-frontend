// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Feed } from 'semantic-ui-react';

import { type State } from 'types/state';
import { type Action } from 'types/action';

import actions from '../actions';
import { getAll } from '../selectors';

import Event from './Event';

type StateProps = {|
  eventIds: $ReadOnlyArray<string>,
|};

type DispatchProps = {|
  handleRequestFeed: () => void,
|};

type Props = {| ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: State): StateProps => {
  return {
    eventIds: getAll(state).map((event) => event.id),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    handleRequestFeed: (): void => {
      dispatch(actions.fetchAll());
    },
  };
};

class PureFeedWrapper extends React.Component<Props, State> {
  componentDidMount = (): void => {
    const { handleRequestFeed } = this.props;
    handleRequestFeed();
  };

  render = (): React.Node => {
    const {
      eventIds,
    } = this.props;

    return (
      <Feed size="large">
        {eventIds.map((eventId) => (
          <Event key={eventId} eventId={eventId} />
        ))}
      </Feed>
    );
  }
}

const FeedWrapper = connect(mapStateToProps, mapDispatchToProps)(PureFeedWrapper);

export { PureFeedWrapper };

export default FeedWrapper;
