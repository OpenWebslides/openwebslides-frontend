// @flow

import * as React from 'react';
import { type ContextRouter as RouterProps } from 'react-router-dom';

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
        <TopicCourse topicId={topicId} />
      </ContainerPageWrapper>
    </AuthWrapper>
  );
};

const CoursePage = PureCoursePage;

export { PureCoursePage };
export default CoursePage;
