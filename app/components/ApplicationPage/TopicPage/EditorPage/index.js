// @flow

import * as React from 'react';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import SidebarsPageWrapper from 'components/SidebarsPageWrapper';
import platform from 'modules/platform';
import topics from 'modules/topics';

type Props = {| ...RouterProps |};

const AuthWrapper = platform.components.AuthWrapper;
const TopicEditor = topics.components.Editor;

const PureEditorPage = (props: Props): React.Node => {
  const { match: { params: { topicId } } } = props;

  return (topicId == null) ? null : (
    <AuthWrapper>
      <SidebarsPageWrapper topicId={topicId}>
        <TopicEditor topicId={topicId} />
      </SidebarsPageWrapper>
    </AuthWrapper>
  );
};

const EditorPage = PureEditorPage;

export { PureEditorPage };
export default EditorPage;
