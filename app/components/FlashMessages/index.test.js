// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyInitialState } from 'lib/testResources';

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
        flashMessages={dummyFlashMessages}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders no flash messages, when the flashMessages array is empty`, (): void => {
    const enzymeWrapper = shallow(
      <PureFlashMessages
        flashMessages={[]}
      />,
    );
    expect(enzymeWrapper.exists('Message')).toBe(false);
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
        <PureFlashMessages
          t={(val: string): string => {
            return val;
          }}
          flashMessages={dummyFlashMessages}
        />
      </DummyProviders>,
    );

    const messages = enzymeWrapper.find(`Message`);

    expect(messages).toHaveLength(2);
    expect(messages.first().text()).toContain(dummyFlashMessages[0].message);
    expect(messages.last().text()).toContain(dummyFlashMessages[1].message);
  });

  describe(`when the browser is unsupported`, (): void => {
    beforeEach((): void => {
      Object.defineProperty(window.navigator, 'userAgent', {
        // Internet Explorer user agent string
        value: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)',
        configurable: true,
      });
    });

    it(`renders an error message`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState}>
          <PureFlashMessages
            flashMessages={[]}
          />
        </DummyProviders>,
      );
      expect(enzymeWrapper.find('[data-test-id="unsupported-browser-message"]').hostNodes()).toHaveLength(1);
    });
  });

  describe(`when the browser is supported`, (): void => {
    beforeEach((): void => {
      Object.defineProperty(window.navigator, 'userAgent', {
        // Firefox user agent string
        value: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        configurable: true,
      });
    });

    it(`does not render an error message`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState}>
          <PureFlashMessages
            flashMessages={[]}
          />
        </DummyProviders>,
      );
      expect(enzymeWrapper.find('[data-test-id="unsupported-browser-message"]')).toHaveLength(0);
    });
  });

});
