// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { InvalidArgumentError } from 'errors';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import actions from '../../actions';

import SignupCard, { PureSignupCard } from '.';

describe(`SignupCard`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  let dummyDispatch: *;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;

    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSignupCard {...dummyProviderProps.translatorProps} onUserFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a signup action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SignupCard />
      </DummyProviders>,
    );
    const onUserFormSubmit = enzymeWrapper.find('PureSignupCard').props().onUserFormSubmit;

    onUserFormSubmit({ email: dummyEmail, name: dummyName, password: dummyPassword, tosAccepted: dummyTosAccepted });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.signup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SignupCard />
      </DummyProviders>,
    );
    const onUserFormSubmit = enzymeWrapper.find('PureSignupCard').props().onUserFormSubmit;

    expect((): void => {
      onUserFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
