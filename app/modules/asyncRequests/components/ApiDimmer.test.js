// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyAsyncRequestData as dummyData } from 'lib/testResources';

import * as m from '../model';

import ApiDimmer, { PureApiDimmer } from './ApiDimmer';

describe(`ApiDimmer`, (): void => {

  let dummyPendingAsyncRequest: m.AsyncRequest;
  let dummySuccessAsyncRequest: m.AsyncRequest;
  let dummyFailureAsyncRequest: m.AsyncRequest;

  let dummyState: any;

  beforeEach((): void => {
    dummyPendingAsyncRequest = { ...dummyData.pendingAsyncRequest };
    dummySuccessAsyncRequest = { ...dummyData.successAsyncRequest };
    dummyFailureAsyncRequest = { ...dummyData.failureAsyncRequest };
    dummyState = {
      modules: {
        asyncRequests: {
          byId: {
            [dummyPendingAsyncRequest.id]: dummyPendingAsyncRequest,
            [dummySuccessAsyncRequest.id]: dummySuccessAsyncRequest,
            [dummyFailureAsyncRequest.id]: dummyFailureAsyncRequest,
          },
        },
      },
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyProviderProps.translatorProps}
        ids={['foobar']}
        isActive={true}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its children, when it is active`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyProviderProps.translatorProps}
        ids={['foobar']}
        isActive={true}
      >
        <p data-test-id="enzyme">test.is.active</p>
      </PureApiDimmer>,
    );
    expect(enzymeWrapper.find('[data-test-id="enzyme"]').text()).toBe('test.is.active');
  });

  it(`does not render, when it is inactive`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyProviderProps.translatorProps}
        ids={['foobar']}
        isActive={false}
      >
        <p data-test-id="enzyme">test.is.active</p>
      </PureApiDimmer>,
    );

    expect(enzymeWrapper.isEmptyRender()).toEqual(true);
  });

  it(`is active, when the requestStatus for a single passed requestId is PENDING`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <ApiDimmer ids={[dummyPendingAsyncRequest.id, dummySuccessAsyncRequest.id, dummyFailureAsyncRequest.id]}>
          <p data-test-id="enzyme">test.is.active</p>
        </ApiDimmer>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="enzyme"]').text()).toBe('test.is.active');
  });

  it(`is not active, when the requestStatus none of the passed requestIds is PENDING`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <ApiDimmer ids={[dummySuccessAsyncRequest.id, dummyFailureAsyncRequest.id]}>
          <p data-test-id="enzyme">test.is.active</p>
        </ApiDimmer>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureApiDimmer').isEmptyRender()).toEqual(true);
  });

  it(`ignores invalid requestIds`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <ApiDimmer ids={[dummySuccessAsyncRequest.id, dummyFailureAsyncRequest.id, 'invalidId']}>
          <p data-test-id="enzyme">test.is.active</p>
        </ApiDimmer>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureApiDimmer').isEmptyRender()).toEqual(true);
  });

});
