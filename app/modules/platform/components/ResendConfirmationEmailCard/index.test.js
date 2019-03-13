// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import actions from '../../actions';

import ResendConfirmationEmailCard, { PureResendConfirmationEmailCard } from '.';

describe(`ResendConfirmationEmailCard`, (): void => {

  let dummyEmail: string;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureResendConfirmationEmailCard onEmailFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a resendConfirmationEmail action, when its form is submitted`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ResendConfirmationEmailCard />
      </DummyProviders>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureResendConfirmationEmailCard').props().onEmailFormSubmit;

    onEmailFormSubmit({ email: dummyEmail });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.resendConfirmationEmail(dummyEmail));
  });

});
