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

import SignupCard, { PureSignupCard } from '.';

describe(`SignupCard`, (): void => {

  let dummyEmail: string;
  let dummyFirstName: string;
  let dummyLastName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyFirstName = 'Test';
    dummyLastName = 'Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;

    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, {});
    dummyStore.dispatch = dummyDispatch;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSignupCard {...dummyTranslatorProps} onUserFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a signup action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SignupCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onUserFormSubmit = enzymeWrapper.find('PureSignupCard').props().onUserFormSubmit;

    onUserFormSubmit({ email: dummyEmail, firstName: dummyFirstName, lastName: dummyLastName, password: dummyPassword, tosAccepted: dummyTosAccepted });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.signup(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SignupCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onUserFormSubmit = enzymeWrapper.find('PureSignupCard').props().onUserFormSubmit;

    expect((): void => {
      onUserFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
