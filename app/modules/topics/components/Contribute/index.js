// @flow

import * as React from 'react';
import { Divider } from 'semantic-ui-react';

import * as m from '../../model';

import SendUpdates from './SendUpdates';
import OutgoingPullRequests from './OutgoingPullRequests';

type PassedProps = {|
  topic: m.Topic,
|};

type Props = {| ...PassedProps |};

const Contribute = (props: Props): React.Node => {
  const { topic } = props;

  if (topic.upstreamTopicId == null) {
    // Render send updates and outgoing pull requests section
    return null;
  }
  else {
    // Render incoming pull requests section
    return (
      <div data-test-id="contribute">
        <SendUpdates topic={topic} />

        <Divider hidden={true} />

        <OutgoingPullRequests topic={topic} />
      </div>
    );
  }
};

export default Contribute;
