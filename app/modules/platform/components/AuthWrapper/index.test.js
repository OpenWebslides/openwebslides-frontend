// @flow

import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { AUTH_SIGNIN_ROUTE } from 'config/routes';

import selectors from '../../selectors';

import AuthWrapper, { PureAuthWrapper } from '.';

describe(`AuthWrapper`, (): void => {

  let dummyReducer: *;
  let dummyStore: *;

  beforeEach((): void => {
    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, {});
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAuthWrapper isAuthenticated={true}>
        <p>Secure text</p>
      </PureAuthWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`passes on the correct props to ConditionalWrapper, when the user is authenticated`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => true): any);

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <AuthWrapper>
            <p>Secure text</p>
            <p>More secure text</p>
          </AuthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('renderChildren')).toBe(true);
    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBe(AUTH_SIGNIN_ROUTE);
    expect(conditionalWrapper.prop('componentIfNotChildren')).toBeNull();
  });

  it(`passes on the correct props to ConditionalWrapper, when the user is not authenticated`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => false): any);

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <AuthWrapper>
            <p>Secure text</p>
            <p>More secure text</p>
          </AuthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('renderChildren')).toBe(false);
    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBe(AUTH_SIGNIN_ROUTE);
    expect(conditionalWrapper.prop('componentIfNotChildren')).toBeNull();
  });

  it(`passes on the correct props to ConditionalWrapper, when redirectIfNotAuthenticated passed`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => false): any);

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <AuthWrapper redirectIfNotAuthenticated="/dummyRoute">
            <p>Secure text</p>
            <p>More secure text</p>
          </AuthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBe('/dummyRoute');
  });

  it(`passes on the correct props to ConditionalWrapper, when componentIfNotAuthenticated is passed`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => false): any);

    const DummyComponent = (): React.Node => <p>dummy</p>;

    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <AuthWrapper componentIfNotAuthenticated={DummyComponent}>
            <p>Secure text</p>
            <p>More secure text</p>
          </AuthWrapper>
        </MemoryRouter>
      </Provider>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('componentIfNotChildren')).toBe(DummyComponent);
  });

});
