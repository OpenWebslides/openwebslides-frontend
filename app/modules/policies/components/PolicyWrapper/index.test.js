// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyUserData } from 'lib/testResources';
import users from 'modules/users';

import policies from '../../policies';

import PolicyWrapper, { PurePolicyWrapper } from '.';

describe(`PolicyWrapper`, (): void => {

  let dummyUser: users.model.User;
  let dummyRecord: string;
  let dummyState: any;
  let dummyDispatch: any;

  class DummyPolicy extends policies.Policy<string> {
    can(): boolean {
      return this.record === 'valid';
    }
  }

  beforeEach((): void => {
    dummyUser = dummyUserData.user;
    dummyRecord = 'invalid';
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
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePolicyWrapper record={dummyRecord} policy={DummyPolicy} action="can" currentUserId={dummyUser.id}>
        <p>children</p>
      </PurePolicyWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders no children when there is no authenticated user`, (): void => {
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PolicyWrapper record={dummyRecord} policy={DummyPolicy} action="can">
          <p data-test-id="policy-wrapper-children">children</p>
        </PolicyWrapper>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="policy-wrapper-children"]').hostNodes()).toHaveLength(0);
  });

  it(`loads the current user, when the current user was not previously present in the state`, (): void => {
    dummyState.modules.users.byId = {};

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PolicyWrapper record={dummyRecord} policy={DummyPolicy} action="can">
          <p data-test-id="policy-wrapper-children">children</p>
        </PolicyWrapper>
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(users.actions.fetch(dummyUser.id));
    expect(enzymeWrapper.find('[data-test-id="policy-wrapper-children"]').hostNodes()).toHaveLength(0);
  });

  it(`renders no children when the policy returns FALSE`, (): void => {
    dummyRecord = 'invalid';

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PolicyWrapper record={dummyRecord} policy={DummyPolicy} action="can">
          <p data-test-id="policy-wrapper-children">children</p>
        </PolicyWrapper>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="policy-wrapper-children"]').hostNodes()).toHaveLength(0);
  });

  it(`renders children when the policy returns TRUE`, (): void => {
    dummyRecord = 'valid';

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PolicyWrapper record={dummyRecord} policy={DummyPolicy} action="can">
          <p data-test-id="policy-wrapper-children">children</p>
        </PolicyWrapper>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="policy-wrapper-children"]').hostNodes()).toHaveLength(1);
  });

});
