// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Header, Menu, Button, Icon } from 'semantic-ui-react';

import { type ModulesAction, type AppState } from 'types/redux';
import FetchWrapper from 'components/FetchWrapper';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  topic: ?m.Topic,
|};

type DispatchProps = {|
  onFork: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { topicId } = props;

  return {
    topic: selectors.getById(state, { id: topicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topicId } = props;

  return {
    onFork: (): void => {
      // TODO: dispatch fork action
      console.log(topicId);
    },
  };
};

class PureViewer extends React.Component<Props> {
  handleForkButtonClick = (): void => {
    const { onFork } = this.props;
    onFork();
  };

  fetchCondition = (topic: ?m.Topic): boolean => {
    return (topic == null || !topic.isContentFetched);
  };

  renderViewer = (topic: m.Topic): React.Node => {
    const { t } = this.props;

    return (
      <div data-test-id="topic-viewer">
        <Menu attached={true} borderless={true} className="viewer-menu">
          <Menu.Menu position="right">
            {topic.upstreamTopicId == null ? (
              <Menu.Item>
                <Button
                  icon={true}
                  labelPosition="left"
                  onClick={this.handleForkButtonClick}
                  data-test-id="topic-viewer-fork-button"
                >
                  <Icon name="fork" />
                  {t('common:button.fork')}
                </Button>
              </Menu.Item>
            ) : ''}

          </Menu.Menu>
        </Menu>

        <Header as="h1">{topic.title}</Header>

        {/* <Course topic={topic} /> */}
      </div>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderViewer}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={actions.fetchWithContent}
        fetchedPropSelector={selectors.getById}
        fetchCondition={this.fetchCondition}
      />
    );
  }
}

const Viewer = connect(mapStateToProps, mapDispatchToProps)(translate()(PureViewer));

export { PureViewer };
export default Viewer;
