// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import FlashMessages, { PureFlashMessages } from '.';

describe(`FlashMessages`, (): void => {

  let dummyLatestFlashMessage: any;

  let dummyState: any;
  let dummyDispatch: any;

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
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <FlashMessages />
      </DummyProviders>,
    );

    expect(enzymeWrapper.text()).toContain('test.string.present');
  });

});
