// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { InvalidArgumentError } from 'errors';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import actions from '../../actions';

import SendResetPasswordEmailCard, { PureSendResetPasswordEmailCard } from '.';

describe(`SendResetPasswordEmailCard`, (): void => {

  let dummyEmail: string;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSendResetPasswordEmailCard {...dummyProviderProps.translatorProps} onEmailFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a resetPassword action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SendResetPasswordEmailCard />
      </DummyProviders>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureSendResetPasswordEmailCard').props().onEmailFormSubmit;

    onEmailFormSubmit({ email: dummyEmail });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.sendResetPasswordEmail(dummyEmail));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SendResetPasswordEmailCard />
      </DummyProviders>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureSendResetPasswordEmailCard').props().onEmailFormSubmit;

    expect((): void => {
      onEmailFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
