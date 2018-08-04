// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import NewTopicPage, { PureNewTopicPage } from '.';

describe(`NewTopicPage`, (): void => {

  let dummyCurrentUser: users.model.User;
  let dummyState: any;

  beforeEach((): void => {
    dummyCurrentUser = { ...dummyUserData.user };
    dummyState = {
      modules: {
        platform: {
          userAuth: {
            userId: dummyCurrentUser.id,
            apiToken: 'foobarToken',
          },
        },
        users: {
          byId: {
            [dummyCurrentUser.id]: dummyCurrentUser,
          },
        },
      },
      flash: { messages: [] },
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicPage currentUserId="dummyUserId" />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders with currentUserId NULL, when there is no current user`, (): void => {
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <NewTopicPage />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`PureNewTopicPage`).props().currentUserId).toBeNull();
  });

  it(`renders a NewTopicCard with userId the current user's id, when there is a current user`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <NewTopicPage />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`PureNewTopicCard`).props().userId).toBe(dummyCurrentUser.id);
  });

});
