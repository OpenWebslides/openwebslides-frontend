// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Item, Icon } from 'semantic-ui-react';
import moment from 'moment';

import FetchWrapper from 'components/FetchWrapper';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  pullRequestId: string,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PurePullRequest extends React.Component<Props> {
  iconForState = (state: m.PullRequestState): React.Node => {
    switch (state) {
      case m.pullRequestStates.PENDING:
      case m.pullRequestStates.READY:
      case m.pullRequestStates.WORKING:
        return (<Icon name="question circle" />);
      case m.pullRequestStates.INCOMPATIBLE:
        return (<Icon name="exclamation circle" color="orange" />);
      case m.pullRequestStates.ACCEPTED:
        return (<Icon name="check" color="green" />);
      case m.pullRequestStates.REJECTED:
        return (<Icon name="close" color="red" />);
      default:
        return null;
    }
  };

  renderPullRequest = (pullRequest: m.PullRequest): React.Node => {
    const { t } = this.props;

    return (
      <Item data-test-id="pull-request">
        <Item.Content>
          <Item.Header as="strong" data-test-id="pull-request-message">
            {/* TODO: link to PR */}
            {pullRequest.message}
          </Item.Header>
          <Item.Meta>
            {this.iconForState(pullRequest.state)} {t(`pullRequests:titleForState.${pullRequest.state}`)}
          </Item.Meta>
          <Item.Extra>
            {moment(pullRequest.timestamp).fromNow()}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  };

  render(): React.Node {
    const { pullRequestId } = this.props;

    return (
      <FetchWrapper
        render={this.renderPullRequest}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={pullRequestId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const PullRequest = withNamespaces()(PurePullRequest);

export { PurePullRequest };
export default PullRequest;
