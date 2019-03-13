// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import actions from '../../actions';

import SigninCard, { PureSigninCard } from '.';

describe(`SigninCard`, (): void => {

  let dummyEmail: string;
  let dummyPassword: string;

  let dummyDispatch: any;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyPassword = 'MahPasswordY0';

    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSigninCard onEmailAndPasswordFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a signin action, when its form is submitted`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SigninCard />
      </DummyProviders>,
    );
    const onEmailAndPasswordFormSubmit = enzymeWrapper.find('PureSigninCard').props().onEmailAndPasswordFormSubmit;

    onEmailAndPasswordFormSubmit({ email: dummyEmail, password: dummyPassword });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.signin(dummyEmail, dummyPassword));
  });

});
