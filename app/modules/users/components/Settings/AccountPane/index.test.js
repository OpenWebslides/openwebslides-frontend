// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyUserData } from 'lib/testResources';

import actions from '../../../actions';
import * as m from '../../../model';

import AccountPane, { PureAccountPane } from '.';

describe(`AccountPane`, (): void => {

  let dummyUser: m.User;
  let dummyDispatch: any;
  let dummyCurrentPassword: string;
  let dummyPassword: string;

  let dummyOnUpdatePassword: any;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
    dummyDispatch = jest.fn();
    dummyCurrentPassword = 'dummyCurrentPassword';
    dummyPassword = 'dummyPassword';

    dummyOnUpdatePassword = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccountPane user={dummyUser} onUpdatePassword={dummyOnUpdatePassword} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a password form`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <AccountPane user={dummyUser} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePasswordForm')).toHaveLength(1);
  });

  it(`dispatches a users UPDATE_PASSWORD action, when the onUpdatePassword function passed to PasswordForm is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <AccountPane user={dummyUser} />
      </DummyProviders>,
    );
    const onSubmit = enzymeWrapper.find('PurePasswordForm').props().onSubmit;
    onSubmit({ currentPassword: dummyCurrentPassword, password: dummyPassword });

    expect(dummyDispatch).toHaveBeenCalledWith(actions.updatePassword(dummyUser.id, dummyCurrentPassword, dummyPassword));
  });

  // TODO: account removal
  // it(`dispatches a users DELETE action, when the close account button is clicked`, (): void => {
  //   const enzymeWrapper = mount(
  //     <DummyProviders dummyDispatch={dummyDispatch}>
  //       <AccountPane user={dummyUser} />
  //     </DummyProviders>,
  //   );
  //   enzymeWrapper.find('[data-test-id="account-pane-close-account-button"]').hostNodes().simulate('click');
  //
  //   expect(dummyDispatch).toHaveBeenCalledWith(actions.delete(dummyUser.id));
  // });

});
