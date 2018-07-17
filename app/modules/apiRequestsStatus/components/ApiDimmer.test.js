// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import i18nextConfig from 'config/i18next';
import { dummyTranslatorProps } from 'config/tests';
import { InvalidArgumentError } from 'errors';

import * as m from '../model';

import ApiDimmer, { PureApiDimmer } from './ApiDimmer';

describe(`ApiDimmer`, (): void => {

  let dummyPendingStatus: m.RequestStatus;
  let dummySuccessStatus: m.RequestStatus;
  let dummyFailureStatus: m.RequestStatus;

  let dummyState: any;

  let dummyReducer: *;
  let dummyStore: *;

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

    dummyReducer = (state: any = {}, action: any): any => state;
    dummyStore = createStore(dummyReducer, dummyState);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyTranslatorProps}
        requestIds={['foobar']}
        isActive={true}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its children, when it is active`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        {...dummyTranslatorProps}
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
        {...dummyTranslatorProps}
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
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <ApiDimmer requestIds={['pendingRequestId', 'failureRequestId', 'successRequestId']}>
            <p data-test-id="enzyme">test.is.active</p>
          </ApiDimmer>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.find('[data-test-id="enzyme"]').text()).toBe('test.is.active');
  });

  it(`is not active, when the requestStatus none of the passed requestIds is PENDING`, (): void => {
    const enzymeWrapper = mount(
      <Provider store={dummyStore}>
        <I18nextProvider i18n={i18nextConfig}>
          <ApiDimmer requestIds={['failureRequestId', 'successRequestId']}>
            <p data-test-id="enzyme">test.is.active</p>
          </ApiDimmer>
        </I18nextProvider>
      </Provider>,
    );

    expect(enzymeWrapper.find('PureApiDimmer').isEmptyRender()).toEqual(true);
  });

  it(`throws an InvalidArgumentError, when one of the requestIds cannot be found`, (): void => {
    // Suppress console.error from mount $FlowFixMe
    console.error = jest.fn();
    expect((): void => {
      mount(
        <Provider store={dummyStore}>
          <I18nextProvider i18n={i18nextConfig}>
            <ApiDimmer requestIds={['failureRequestId', 'successRequestId', 'invalidId']}>
              <p data-test-id="enzyme">test.is.active</p>
            </ApiDimmer>
          </I18nextProvider>
        </Provider>,
      );
    }).toThrow(InvalidArgumentError);
  });

});
