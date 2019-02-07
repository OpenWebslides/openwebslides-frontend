// @flow

import * as React from 'react';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import SidebarsPageWrapper from 'components/SidebarsPageWrapper';
import makeRoute from 'lib/makeRoute';
import platform from 'modules/platform';
import topics from 'modules/topics';
import policies from 'modules/policies';

type Props = {| ...RouterProps |};

const AuthWrapper = platform.components.AuthWrapper;
const TopicEditor = topics.components.Editor;
const { TopicPolicyWrapper } = policies.components;

const PureEditorPage = (props: Props): React.Node => {
  const { match: { params: { topicId } } } = props;

  return (topicId == null) ? null : (
    <AuthWrapper>
      <TopicPolicyWrapper
        topicId={topicId}
        action="update"
        redirectIfNotAuthenticated={makeRoute(TOPIC_VIEWER_ROUTE, { topicId })}
        componentIfNotAuthenticated={null}
      >
        <SidebarsPageWrapper
          topicId={topicId}
          enabledSidebarIds={[
            platform.model.sidebarIds.TOPIC_INFO,
            platform.model.sidebarIds.SLIDE_PREVIEWS,
            platform.model.sidebarIds.CONTRIBUTE,
          ]}
        >
          <TopicEditor topicId={topicId} />
        </SidebarsPageWrapper>
      </TopicPolicyWrapper>
    </AuthWrapper>
  );
};

const EditorPage = PureEditorPage;

export { PureEditorPage };
export default EditorPage;
