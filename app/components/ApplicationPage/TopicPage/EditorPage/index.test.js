// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import { DummyProviders, dummyProviderProps, dummyTopicData, dummyUserData, dummyInitialState } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';
import platform from 'modules/platform';

import EditorPage, { PureEditorPage } from '.';

describe(`EditorPage`, (): void => {

  let dummyUser: users.model.User;
  let dummyTopic: topics.model.Topic;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyUser = dummyUserData.user;
    dummyTopic = { ...dummyTopicData.topic, userId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        platform: {
          ...dummyInitialState.modules.platform,
          userAuth: { userId: dummyUser.id, apiToken: 'foobarToken' },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
      },
    };
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PureEditorPage {...fixedRouterProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders NULL when match.params.id is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureEditorPage {...dummyProviderProps.routerProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`renders a TopicPolicyWrapper that redirects to the correct route when unauthorized`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PureEditorPage
          {...fixedRouterProps}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureTopicPolicyWrapper')).toHaveLength(1);
    expect(enzymeWrapper.find('PureTopicPolicyWrapper').props().redirectIfNotAuthenticated).toStrictEqual(makeRoute(TOPIC_VIEWER_ROUTE, { topicId: dummyTopic.id }));
  });

  it(`enables the correct sidebars`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <EditorPage
          {...fixedRouterProps}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSidebarsPageWrapper').props().enabledSidebarIds).toStrictEqual([
      platform.model.sidebarIds.TOPIC_INFO,
      platform.model.sidebarIds.SLIDE_PREVIEWS,
      platform.model.sidebarIds.CONTRIBUTE,
    ]);
  });

});
