// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { AUTH_SIGNIN_ROUTE } from 'config/routes';
import { DummyProviders } from 'lib/testResources';

import selectors from '../../selectors';

import AuthWrapper, { PureAuthWrapper } from '.';

describe(`AuthWrapper`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAuthWrapper isAuthenticated={true}>
        <p>Secure text</p>
      </PureAuthWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`passes on the correct props to ConditionalWrapper, when the user is authenticated`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => true): any);

    const enzymeWrapper = mount(
      <DummyProviders>
        <AuthWrapper>
          <p>Secure text</p>
          <p>More secure text</p>
        </AuthWrapper>
      </DummyProviders>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('renderChildren')).toBe(true);
    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBe(AUTH_SIGNIN_ROUTE);
    expect(conditionalWrapper.prop('componentIfNotChildren')).toBeNull();
  });

  it(`passes on the correct props to ConditionalWrapper, when the user is not authenticated`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => false): any);

    const enzymeWrapper = mount(
      <DummyProviders>
        <AuthWrapper>
          <p>Secure text</p>
          <p>More secure text</p>
        </AuthWrapper>
      </DummyProviders>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('renderChildren')).toBe(false);
    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBe(AUTH_SIGNIN_ROUTE);
    expect(conditionalWrapper.prop('componentIfNotChildren')).toBeNull();
  });

  it(`passes on the correct props to ConditionalWrapper, when redirectIfNotAuthenticated passed`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => false): any);

    const enzymeWrapper = mount(
      <DummyProviders>
        <AuthWrapper redirectIfNotAuthenticated="/dummyRoute">
          <p>Secure text</p>
          <p>More secure text</p>
        </AuthWrapper>
      </DummyProviders>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('redirectIfNotChildren')).toBe('/dummyRoute');
  });

  it(`passes on the correct props to ConditionalWrapper, when componentIfNotAuthenticated is passed`, (): void => {
    selectors.isAuthenticated = (jest.fn((): boolean => false): any);

    const DummyComponent = (): React.Node => <p>dummy</p>;

    const enzymeWrapper = mount(
      <DummyProviders>
        <AuthWrapper componentIfNotAuthenticated={DummyComponent}>
          <p>Secure text</p>
          <p>More secure text</p>
        </AuthWrapper>
      </DummyProviders>,
    );
    const conditionalWrapper = enzymeWrapper.find('PureConditionalWrapper');

    expect(conditionalWrapper.prop('componentIfNotChildren')).toBe(DummyComponent);
  });

});
