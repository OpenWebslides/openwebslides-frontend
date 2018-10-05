// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { Button, Menu, Icon } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import FetchWrapper from 'components/FetchWrapper';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';

type DispatchProps = {|
  onFork: () => void,
|};

type Props = {| ...RouterProps, ...TranslatorProps, ...DispatchProps |};

const AuthWrapper = platform.components.AuthWrapper;
const Course = topics.components.Course;

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: Props,
): DispatchProps => {
  const { match: { params: { topicId } } } = props;

  return {
    onFork: (): void => {
      console.log(topicId);
    },
  };
};

class PureCoursePage extends React.Component<Props> {
  handleForkButtonClick = (): void => {
    const { onFork } = this.props;
    onFork();
  };

  renderCoursePage = (topic: topics.model.Topic): React.Node => {
    const { t } = this.props;

    return (
      <div data-test-id="topic-course">
        <AuthWrapper>
          <ContainerPageWrapper>
            <Menu attached={true} borderless={true} className="course-menu">
              <Menu.Menu position="right">
                {topic.upstreamTopicId == null ? (
                  <Menu.Item>
                    <Button
                      icon={true}
                      labelPosition="left"
                      onClick={this.handleForkButtonClick}
                      data-test-id="topic-course-fork-button"
                    >
                      <Icon name="fork" />
                      {t('common:button.fork')}
                    </Button>
                  </Menu.Item>
                ) : ''}

              </Menu.Menu>
            </Menu>

            <Course topicId={topic.id} />
          </ContainerPageWrapper>
        </AuthWrapper>
      </div>
    );
  };

  render(): React.Node {
    const { match: { params: { topicId } } } = this.props;

    // TODO: show error page?
    if (topicId == null) return null;

    return (
      <FetchWrapper
        render={this.renderCoursePage}
        renderPropsAndState={this.props}
        fetchId={topicId}
        fetchAction={topics.actions.fetchWithContent}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const CoursePage = connect(null, mapDispatchToProps)(translate()(PureCoursePage));

export { PureCoursePage };
export default CoursePage;
