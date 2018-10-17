// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { InvalidArgumentError } from 'errors';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';

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
      <PureSignupCard {...dummyProviderProps.translatorProps} onUserFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`calls the passed onSignup function, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <SignupCard onSignup={dummyOnSignup} />
      </DummyProviders>,
    );
    const handleUserFormSubmit = enzymeWrapper.find('PureSignupCard').instance().handleUserFormSubmit;

    handleUserFormSubmit({ email: dummyEmail, name: dummyName, password: dummyPassword, tosAccepted: dummyTosAccepted });
    expect(dummyOnSignup).toHaveBeenCalledWith(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <SignupCard onSignup={dummyOnSignup} />
      </DummyProviders>,
    );
    const handleUserFormSubmit = enzymeWrapper.find('PureSignupCard').instance().handleUserFormSubmit;

    expect((): void => {
      handleUserFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
