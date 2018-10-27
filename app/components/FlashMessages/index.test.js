// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps } from 'lib/testResources';

import FlashMessages, { PureFlashMessages, type Flash } from '.';

describe(`FlashMessages`, (): void => {

  let dummyFlashMessages: $ReadOnlyArray<Flash>;

  let dummyState: any;

  beforeEach((): void => {
    dummyFlashMessages = [
      {
        id: '123456789',
        message: 'test.message.1',
        isError: true,
        props: {
          title: 'test.title.exists',
        },
      },
      {
        id: '987654321',
        message: 'test.message.2',
        isError: false,
        props: {},
      },
    ];
    dummyState = {
      ...dummyInitialState,
      flash: {
        ...dummyInitialState.flash,
        messages: dummyFlashMessages,
      },
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureFlashMessages
        {...dummyProviderProps.translatorProps}
        flashMessages={dummyFlashMessages}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders NULL, when the flashMessages array is empty`, (): void => {
    const enzymeWrapper = shallow(
      <PureFlashMessages
        {...dummyProviderProps.translatorProps}
        flashMessages={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`renders the flash message's title, when a title prop is passed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <FlashMessages />
      </DummyProviders>,
    );

    expect(enzymeWrapper.text()).toContain(dummyFlashMessages[0].props.title);
  });

  it(`renders all flash messages, when the flashMessages array is not empty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <FlashMessages />
      </DummyProviders>,
    );

    expect(enzymeWrapper.text()).toContain(dummyFlashMessages[0].message);
    expect(enzymeWrapper.text()).toContain(dummyFlashMessages[1].message);
  });

});
