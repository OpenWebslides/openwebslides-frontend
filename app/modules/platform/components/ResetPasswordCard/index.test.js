// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { InvalidArgumentError } from 'errors';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import actions from '../../actions';

import ResetPasswordCard, { PureResetPasswordCard } from '.';

describe(`ResetPasswordCard`, (): void => {

  let dummyEmail: string;
  let dummyDispatch: *;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureResetPasswordCard {...dummyProviderProps.translatorProps} onEmailFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a resetPassword action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ResetPasswordCard />
      </DummyProviders>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureResetPasswordCard').props().onEmailFormSubmit;

    onEmailFormSubmit({ email: dummyEmail });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.resetPassword(dummyEmail));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ResetPasswordCard />
      </DummyProviders>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureResetPasswordCard').props().onEmailFormSubmit;

    expect((): void => {
      onEmailFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
