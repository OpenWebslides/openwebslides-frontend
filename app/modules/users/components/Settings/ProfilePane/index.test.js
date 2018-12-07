// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyUserData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import ProfilePane, { PureProfilePane } from '.';

describe(`ProfilePane`, (): void => {

  let dummyUser: m.User;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfilePane
        {...dummyProviderProps.translatorProps}
        user={dummyUser}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a profile form`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ProfilePane user={dummyUser} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('ProfileForm')).toHaveLength(1);
  });

  it(`dispatches a users UPDATE action, when the onRemoveTopic function passed to TopicsList is called`, (): void => {
    const dummyTopicId = 'dummyTopicId';
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ProfilePane userId={dummyUser.id} />
      </DummyProviders>,
    );
    const onRemoveTopic = enzymeWrapper.find('PureTopicsList').props().onRemoveTopic;
    onRemoveTopic(dummyTopicId);

    expect(dummyDispatch).toHaveBeenCalledWith(actions.removeTopic(dummyUser.id, dummyTopicId));
  });

});
