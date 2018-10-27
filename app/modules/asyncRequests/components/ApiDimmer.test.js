// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyAsyncRequestData as dummyData } from 'lib/testResources';

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
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        asyncRequests: {
          ...dummyInitialState.modules.asyncRequests,
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
        isActive={true}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`does not render, when it is inactive`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyProviderProps.translatorProps}
        isActive={false}
      />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`is active, when there are one or more PENDING requests in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <ApiDimmer />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureApiDimmer').isEmptyRender()).toBe(false);
  });

  it(`is not active, when the requestStatus none of the passed requestIds is PENDING`, (): void => {
    dummyState.modules.asyncRequests.byId = _.omit(dummyState.modules.asyncRequests.byId, dummyPendingAsyncRequest.id);
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <ApiDimmer />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureApiDimmer').isEmptyRender()).toBe(true);
  });

});
