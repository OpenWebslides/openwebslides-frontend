// @flow

import * as React from 'react';

import FetchWrapper from 'components/FetchWrapper';
import topics from 'modules/topics';

import policies from '../../policies';
import PolicyWrapper from '../PolicyWrapper';

type PassedProps = {|
  // The ID of the topic being validated
  topicId: string,
  // The policy action used for validation
  action: string,
  // The component rendered if the policy validates
  children: React.Node,
  // Optional route to which the user will be redirected, if the user is not authenticated.
  // Defaults to SIGNIN_ROUTE. Redirecting can be disabled by setting this to NULL.
  redirectIfNotAuthenticated: ?string,
  // Optional component that will be rendered instead of the children,
  // if the user is not authenticated.
  componentIfNotAuthenticated: ?React.ComponentType<{}>,
|};

type Props = {| ...PassedProps |};

class PureTopicPolicyWrapper extends React.Component<Props> {
  renderPolicyWrapper = (topic: topics.model.Topic): React.Node => {
    const {
      action,
      children,
      redirectIfNotAuthenticated,
      componentIfNotAuthenticated,
    } = this.props;

    return (
      <PolicyWrapper
        record={topic}
        policy={policies.TopicPolicy}
        action={action}
        redirectIfNotAuthenticated={redirectIfNotAuthenticated}
        componentIfNotAuthenticated={componentIfNotAuthenticated}
      >
        {children}
      </PolicyWrapper>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderPolicyWrapper}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={topics.actions.fetch}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const TopicPolicyWrapper = PureTopicPolicyWrapper;

export { PureTopicPolicyWrapper };
export default TopicPolicyWrapper;
