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

import SigninCard, { PureSigninCard } from '.';

describe(`SigninCard`, (): void => {

  let dummyEmail: string;
  let dummyPassword: string;

  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyState: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyPassword = 'MahPasswordY0';

    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyState = { modules: { apiRequestsStatus: {} } };
    dummyStore = createStore(dummyReducer, dummyState);
    dummyStore.dispatch = dummyDispatch;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSigninCard {...dummyTranslatorProps} onEmailAndPasswordFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a signin action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SigninCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onEmailAndPasswordFormSubmit = enzymeWrapper.find('PureSigninCard').props().onEmailAndPasswordFormSubmit;

    onEmailAndPasswordFormSubmit({ email: dummyEmail, password: dummyPassword });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.signin(dummyEmail, dummyPassword));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <SigninCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onEmailAndPasswordFormSubmit = enzymeWrapper.find('PureSigninCard').props().onEmailAndPasswordFormSubmit;

    expect((): void => {
      onEmailAndPasswordFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
