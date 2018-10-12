// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { InvalidArgumentError } from 'errors';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import actions from '../../actions';

import SigninCard, { PureSigninCard } from '.';

describe(`SigninCard`, (): void => {

  let dummyEmail: string;
  let dummyPassword: string;

  let dummyDispatch: any;
  let dummyState: any;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyPassword = 'MahPasswordY0';

    dummyDispatch = jest.fn();
    dummyState = { modules: { asyncRequests: { byId: {} } } };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSigninCard {...dummyProviderProps.translatorProps} onEmailAndPasswordFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a signin action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SigninCard />
      </DummyProviders>,
    );
    const onEmailAndPasswordFormSubmit = enzymeWrapper.find('PureSigninCard').props().onEmailAndPasswordFormSubmit;

    onEmailAndPasswordFormSubmit({ email: dummyEmail, password: dummyPassword });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.signin(dummyEmail, dummyPassword));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SigninCard />
      </DummyProviders>,
    );
    const onEmailAndPasswordFormSubmit = enzymeWrapper.find('PureSigninCard').props().onEmailAndPasswordFormSubmit;

    expect((): void => {
      onEmailAndPasswordFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
