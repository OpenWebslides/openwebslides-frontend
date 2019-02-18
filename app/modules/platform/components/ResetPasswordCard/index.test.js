// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

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
        onResetPasswordFormSubmit={jest.fn()}
        resetPasswordToken={dummyResetPasswordToken}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a resetPassword action, when its form is submitted`, (): void => {
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

});
