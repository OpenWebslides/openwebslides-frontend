// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import actions from '../actions';

import ErrorBoundary, { PureErrorBoundary } from './ErrorBoundary';

describe(`ErrorBoundary`, (): void => {

  let dummyOnLog: any;
  let dummyDispatch: any;

  let dummyError: Error;

  const ErrorThrowingComponent = (): React.Node => {
    throw dummyError;

    /* eslint-disable no-unreachable */
    // $FlowFixMe intentional unreachable code
    return (
      <p>This code is never reached.</p>
    );
    /* eslint-enable */
  };

  beforeEach((): void => {
    dummyOnLog = jest.fn();
    dummyDispatch = jest.fn();
    dummyError = new Error('dummy');
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureErrorBoundary onLog={dummyOnLog}>
        <p>Lorem ipsum dolor sit amet.</p>
      </PureErrorBoundary>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders its children, when none of its children throws an error`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ErrorBoundary>
          <p>test.no.errors.thrown</p>
        </ErrorBoundary>
      </DummyProviders>,
    );
    expect(enzymeWrapper.text()).toContain('test.no.errors.thrown');
  });

  it(`renders an error message and logs the error, when one of its children throws an error`, (): void => {
    // Don't display the intentionally thrown error in the test output $FlowFixMe
    console.error = jest.fn();

    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <ErrorBoundary>
          <p>test.errors.thrown</p>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      </DummyProviders>,
    );

    expect(enzymeWrapper.text()).toContain('Something went wrong.');
    expect(enzymeWrapper.text()).not.toContain('test.errors.thrown');
    expect(dummyDispatch).toHaveBeenCalledWith(actions.log(dummyError));
  });

});
