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

import ConfirmEmailCard, { PureConfirmEmailCard } from '.';

describe(`ConfirmEmailCard`, (): void => {

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
      <PureConfirmEmailCard {...dummyTranslatorProps} onEmailFormSubmit={jest.fn()} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a confirmEmail action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <ConfirmEmailCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureConfirmEmailCard').props().onEmailFormSubmit;

    onEmailFormSubmit({ email: dummyEmail });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.confirmEmail(dummyEmail));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <ConfirmEmailCard />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );
    const onEmailFormSubmit = enzymeWrapper.find('PureConfirmEmailCard').props().onEmailFormSubmit;

    expect((): void => {
      onEmailFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
