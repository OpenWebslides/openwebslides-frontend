// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { InvalidArgumentError } from 'errors';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import actions from '../../actions';

import ResetPasswordCard, { PureResetPasswordCard } from '.';

describe(`ResetPasswordCard`, (): void => {

  let dummyPassword: string;
  let dummyResetPasswordToken: string;

  let dummyDispatch: any;

  beforeEach((): void => {
    dummyPassword = 'P@ssword1';
    dummyResetPasswordToken = 'foobarToken';

    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureResetPasswordCard
        {...dummyProviderProps.translatorProps}
        onResetPasswordFormSubmit={jest.fn()}
        resetPasswordToken={dummyResetPasswordToken}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a resetPassword action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ResetPasswordCard
          resetPasswordToken={dummyResetPasswordToken}
        />
      </DummyProviders>,
    );
    const onResetPasswordFormSubmit = enzymeWrapper.find('PureResetPasswordCard').props().onResetPasswordFormSubmit;

    onResetPasswordFormSubmit({ password: dummyPassword, resetPasswordToken: dummyResetPasswordToken });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.resetPassword(dummyPassword, dummyResetPasswordToken));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ResetPasswordCard
          resetPasswordToken={dummyResetPasswordToken}
        />
      </DummyProviders>,
    );
    const onResetPasswordFormSubmit = enzymeWrapper.find('PureResetPasswordCard').props().onResetPasswordFormSubmit;

    expect((): void => {
      onResetPasswordFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
