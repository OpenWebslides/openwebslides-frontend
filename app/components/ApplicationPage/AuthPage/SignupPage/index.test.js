// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import users from 'modules/users';

import SignupPage, { PureSignupPage } from '.';

describe(`SignupPage`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;

    dummyState = {
      flash: { messages: [] },
      modules: {
        asyncRequests: { byId: {} },
        platform: { userAuth: null },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSignupPage
        {...dummyProviderProps.translatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a users SIGNUP action, when the onSignup passed to SignupCard is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SignupPage />
      </DummyProviders>,
    );

    const onSignup = enzymeWrapper.find('PureSignupCard').props().onSignup;

    onSignup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);
    expect(dummyDispatch).toHaveBeenCalledWith(users.actions.signup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted));
  });

});
