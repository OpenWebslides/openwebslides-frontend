// @flow

import * as React from 'react';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import SidebarsPageWrapper from 'components/SidebarsPageWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';

type Props = {| ...RouterProps |};

const AuthWrapper = platform.components.AuthWrapper;
const TopicCourse = topics.components.Course;

const PureCoursePage = (props: Props): React.Node => {
  const { match: { params: { topicId } } } = props;

  return (topicId == null) ? null : (
    <AuthWrapper>
      <SidebarsPageWrapper topicId={topicId}>
        <TopicCourse topicId={topicId} />
      </SidebarsPageWrapper>
    </AuthWrapper>
  );
};

const CoursePage = PureCoursePage;

export { PureCoursePage };
export default CoursePage;
