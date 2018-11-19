// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { clearMessages } from 'redux-flash';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import PageWrapper, { PurePageWrapper } from '.';

describe(`PageWrapper`, (): void => {

  let dummyDispatch: any;

  beforeEach((): void => {
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePageWrapper onClearFlashMessages={jest.fn()} {...dummyProviderProps.translatorProps}>
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </PurePageWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`clears all flash messages on page load`, (): void => {
    mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <PageWrapper>
          <h1>Lorem ipsum</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </PageWrapper>
      </DummyProviders>,
    );
    expect(dummyDispatch).toHaveBeenCalledWith(clearMessages());
  });

});
