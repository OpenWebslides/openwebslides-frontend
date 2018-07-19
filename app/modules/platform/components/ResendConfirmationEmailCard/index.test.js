// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { InvalidArgumentError } from 'errors';
import i18nextConfig from 'config/i18next';
import { dummyTranslatorProps } from 'config/tests';

import actions from '../../actions';

import ResendConfirmationEmailCard, { PureResendConfirmationEmailCard } from '.';

describe(`ResendConfirmationEmailCard`, (): void => {

  let dummyEmail: string;

  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';

    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, {});
    dummyStore.dispatch = dummyDispatch;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureResendConfirmationEmailCard {...dummyTranslatorProps} onEmailFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a resendConfirmationEmail action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <ResendConfirmationEmailCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureResendConfirmationEmailCard').props().onEmailFormSubmit;

    onEmailFormSubmit({ email: dummyEmail });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.resendConfirmationEmail(dummyEmail));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <ResendConfirmationEmailCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureResendConfirmationEmailCard').props().onEmailFormSubmit;

    expect((): void => {
      onEmailFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
