// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyUserData, dummyInitialState } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import UserComment, { PureUserComment } from '.';

describe(`UserComment`, (): void => {

  let dummyUser: m.User;
  let dummyTimestamp: number;
  let dummyUsersById: m.UsersById;
  let dummyState: any;
  let dummyDispatch: any;
  let DummyChildComponent: () => React.Node;

  beforeEach((): void => {
    dummyUser = dummyUserData.user;
    dummyTimestamp = 1234567890;
    dummyUsersById = {
      [dummyUser.id]: dummyUser,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        users: {
          ...dummyInitialState.modules.users,
          byId: dummyUsersById,
        },
      },
    };
    dummyDispatch = jest.fn();
    DummyChildComponent = (): React.Node => (
      <p>dummyMessage</p>
    );
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserComment
        userId={dummyUser.id}
        timestamp={dummyTimestamp}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the user, when the user was not previously present in the state`, (): void => {
    _.unset(dummyUsersById, dummyUser.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserComment userId={dummyUser.id} timestamp={dummyTimestamp} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyUser.id));
    expect(enzymeWrapper.find('[data-test-id="user-comment"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the outgoing user component, when the user was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserComment userId={dummyUser.id} timestamp={dummyTimestamp} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="user-comment"]').hostNodes()).toHaveLength(1);
  });

  it(`renders its children`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UserComment userId={dummyUser.id} timestamp={dummyTimestamp}>
          <DummyChildComponent />
        </UserComment>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find(DummyChildComponent)).toHaveLength(1);
  });

});
