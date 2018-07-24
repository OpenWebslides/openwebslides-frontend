// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import * as m from '../model';

import ApiDimmer, { PureApiDimmer } from './ApiDimmer';

describe(`ApiDimmer`, (): void => {

  let dummyPendingStatus: m.RequestStatus;
  let dummySuccessStatus: m.RequestStatus;
  let dummyFailureStatus: m.RequestStatus;

  let dummyState: any;

  beforeEach((): void => {
    dummyPendingStatus = {
      status: m.statusTypes.PENDING,
    };
    dummySuccessStatus = {
      status: m.statusTypes.SUCCESS,
      value: { foo: 'bar' },
    };
    dummyFailureStatus = {
      status: m.statusTypes.FAILURE,
      error: new Error('dummyMessage'),
    };
    dummyState = {
      modules: {
        apiRequestsStatus: {
          pendingRequestId: dummyPendingStatus,
          successRequestId: dummySuccessStatus,
          failureRequestId: dummyFailureStatus,
        },
      },
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyProviderProps.translatorProps}
        requestIds={['foobar']}
        isActive={true}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its children, when it is active`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyProviderProps.translatorProps}
        requestIds={['foobar']}
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
        requestIds={['foobar']}
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
        <ApiDimmer requestIds={['pendingRequestId', 'failureRequestId', 'successRequestId']}>
          <p data-test-id="enzyme">test.is.active</p>
        </ApiDimmer>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="enzyme"]').text()).toBe('test.is.active');
  });

  it(`is not active, when the requestStatus none of the passed requestIds is PENDING`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <ApiDimmer requestIds={['failureRequestId', 'successRequestId']}>
          <p data-test-id="enzyme">test.is.active</p>
        </ApiDimmer>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureApiDimmer').isEmptyRender()).toEqual(true);
  });

  it(`ignores invalid requestIds`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <ApiDimmer requestIds={['failureRequestId', 'successRequestId', 'invalidRequestId']}>
          <p data-test-id="enzyme">test.is.active</p>
        </ApiDimmer>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureApiDimmer').isEmptyRender()).toEqual(true);
  });

});
