// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { push } from 'connected-react-router';

import { HOME_ROUTE } from 'config/routes';
import { DummyProviders } from 'lib/testResources';
import users from 'modules/users';

import SignupPage, { PureSignupPage } from '.';

describe(`SignupPage`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  let dummyDispatch: any;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;

    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSignupPage onSignup={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a users SIGNUP action and redirects to the home page, when the onSignup passed to SignupCard is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SignupPage />
      </DummyProviders>,
    );

    const onSignup = enzymeWrapper.find('PureSignupCard').props().onSignup;

    onSignup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);
    expect(dummyDispatch).toHaveBeenCalledWith(users.actions.signup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted));
    expect(dummyDispatch).toHaveBeenCalledWith(push(HOME_ROUTE));
  });

});
