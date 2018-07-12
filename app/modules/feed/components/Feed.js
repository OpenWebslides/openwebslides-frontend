// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Feed } from 'semantic-ui-react';

import type { Identifier } from 'types/model';
import type { State } from 'types/state';

import { getAll } from '../selectors';
import { fetch } from '../actions';

import Event from './Event';

type StateProps = {|
  eventIds: Array<Identifier>,
|};

type DispatchProps = {|
  handleRequestFeed: () => void,
|};

type Props = {|
  ...StateProps,
  ...DispatchProps,
|};

const mapStateToProps = (state: State): StateProps => {
  return {
    eventIds: getAll(state).map((event) => event.id),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    handleRequestFeed: (): void => {
      dispatch(fetch());
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
