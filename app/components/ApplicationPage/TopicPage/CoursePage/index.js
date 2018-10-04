// @flow

import * as React from 'react';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';

type Props = {| ...RouterProps |};

const AuthWrapper = platform.components.AuthWrapper;
const TopicCourse = topics.components.Course;

const PureCoursePage = (props: Props): React.Node => {
  const { match: { params: { topicId } } } = props;

  return (topicId == null) ? null : (
    <AuthWrapper>
      <ContainerPageWrapper>
        <Menu attached={true} borderless={true} className="course-menu">
          <Menu.Menu position="right">
            <Menu attached={true} className="course-menu">
              <Menu.Item>
                <Button>Fork</Button>
              </Menu.Item>
            </Menu>
          </Menu.Menu>
        </Menu>

        <TopicCourse topicId={topicId} />
      </ContainerPageWrapper>
    </AuthWrapper>
  );
};

const CoursePage = PureCoursePage;

export { PureCoursePage };
export default CoursePage;
