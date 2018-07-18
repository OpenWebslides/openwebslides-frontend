// @flow

import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import selectors from '../../selectors';

import UnauthWrapper, { PureUnauthWrapper } from '.';

describe(`UnauthWrapper`, (): void => {

  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, {});
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUnauthWrapper isAuthenticated={false}>
        <p>Secure text</p>
      </PureUnauthWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`passes on the correct props to ConditionalWrapper, when the user is not authenticated`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => false): any);

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <UnauthWrapper>
            <p>Secure text</p>
            <p>More secure text</p>
          </UnauthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('renderChildren')).toBe(true);
    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBeNull();
    expect(conditionalWrapper.prop('componentIfNotChildren')).toBeNull();
  });

  it(`passes on the correct props to ConditionalWrapper, when the user is authenticated`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => true): any);

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <UnauthWrapper>
            <p>Secure text</p>
            <p>More secure text</p>
          </UnauthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('renderChildren')).toBe(false);
    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBeNull();
    expect(conditionalWrapper.prop('componentIfNotChildren')).toBeNull();
  });

  it(`passes on the correct props to ConditionalWrapper, when redirectIfAuthenticated passed`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => true): any);

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <UnauthWrapper redirectIfAuthenticated="/dummyRoute">
            <p>Secure text</p>
            <p>More secure text</p>
          </UnauthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBe('/dummyRoute');
  });

  it(`passes on the correct props to ConditionalWrapper, when componentIfAuthenticated is passed`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => true): any);

    const DummyComponent = (): React.Node => <p>dummy</p>;

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <UnauthWrapper componentIfAuthenticated={DummyComponent}>
            <p>Secure text</p>
            <p>More secure text</p>
          </UnauthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('componentIfNotChildren')).toBe(DummyComponent);
  });

});
