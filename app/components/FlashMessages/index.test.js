// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyProviderProps } from 'lib/testResources';

import FlashMessages, { PureFlashMessages } from '.';

describe(`FlashMessages`, (): void => {

  let dummyLatestFlashMessage: *;

  let dummyState: any;
  let dummyDispatch: *;
  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyLatestFlashMessage = {
      id: 123456789,
      message: 'common:test',
      isError: true,
      props: {},
    };
    dummyState = {
      flash: {
        messages: [
          {
            id: 987654321,
            message: 'Another flash message',
            isError: false,
            props: {},
          },
          dummyLatestFlashMessage,
        ],
      },
    };
    dummyDispatch = jest.fn();
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, dummyState);
    dummyStore.dispatch = dummyDispatch;
  });

  it(`renders without errors`, (): void => {
    const flash = {
      id: 'abcd1234',
      message: 'Dummy flash',
      isError: false,
      props: {
        title: 'foo',
      },
    };

    const enzymeWrapper = shallow(
      <PureFlashMessages
        {...dummyProviderProps.translatorProps}
        flash={flash}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders nothing without flash`, (): void => {
    const enzymeWrapper = shallow(
      <PureFlashMessages
        {...dummyProviderProps.translatorProps}
        flash={null}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(true);
  });

  it(`renders the latest flash message`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <MemoryRouter>
            <FlashMessages />
          </MemoryRouter>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.text()).toContain('test.string.present');
  });

});
