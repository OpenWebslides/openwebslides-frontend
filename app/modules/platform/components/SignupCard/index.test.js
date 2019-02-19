// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import SignupCard, { PureSignupCard } from '.';

describe(`SignupCard`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  let dummyOnSignup: any;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;

    dummyOnSignup = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSignupCard onSignup={dummyOnSignup} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`calls the passed onSignup function, when its form is submitted`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <SignupCard onSignup={dummyOnSignup} />
      </DummyProviders>,
    );
    const handleNewUserFormSubmit = enzymeWrapper.find('PureSignupCard').instance().handleNewUserFormSubmit;

    handleNewUserFormSubmit({ email: dummyEmail, name: dummyName, password: dummyPassword, tosAccepted: dummyTosAccepted });
    expect(dummyOnSignup).toHaveBeenCalledWith(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);
  });

});
