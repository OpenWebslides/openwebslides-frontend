// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { type AppState } from 'types/redux';
import { DummyProviders } from 'lib/testResources';

import FetchWrapper, { PureFetchWrapper } from '.';

type DummyType = {| foo: string, bar: string, fetchCondition: boolean |};

describe(`FetchWrapper`, (): void => {

  let dummyFetchedProp: DummyType;
  let dummyRender: (DummyType) => React.Node;
  let dummyFetchId: string;
  let dummyFetchAction: (id: string) => {};
  let dummyFetchedPropSelector: (state: AppState, { id: string }) => ?DummyType;

  beforeEach((): void => {
    dummyFetchedProp = { foo: 'foo', bar: 'bar', fetchCondition: false };
    dummyRender = jest.fn((fetchedProp: DummyType): React.Node => <p>{`${fetchedProp.foo}&${fetchedProp.bar}`}</p>);
    dummyFetchId = 'dummyId';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      // $FlowFixMe probably https://github.com/facebook/flow/issues/4743 ?
      <PureFetchWrapper
        render={dummyRender}
        renderPropsAndState={{}}
        fetchId={dummyFetchId}
        fetchAction={jest.fn()}
        fetchedPropSelector={jest.fn()}
        fetch={jest.fn()}
        fetchedProp={dummyFetchedProp}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders NULL and executes the passed fetchAction, when the passed fetchedPropSelector returns NULL`, (): void => {
    dummyFetchAction = jest.fn();
    dummyFetchedPropSelector = jest.fn((state: AppState, props: { id: string }): ?DummyType => {
      const { id } = props;
      if (id === dummyFetchId) return null;
      else throw new Error(`This shouldnt happen`);
    });

    const enzymeWrapper = mount(
      <DummyProviders>
        <FetchWrapper
          render={dummyRender}
          renderPropsAndState={{}}
          fetchId={dummyFetchId}
          fetchAction={dummyFetchAction}
          fetchedPropSelector={dummyFetchedPropSelector}
        />
      </DummyProviders>,
    );

    expect(dummyFetchAction).toHaveBeenCalledWith(dummyFetchId);
    expect(dummyRender).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('PureFetchWrapper').isEmptyRender()).toBe(true);
  });

  it(`renders the passed render function with the correct argument and does not execute the passed fetchAction, when the passed fetchedPropSelector does not return NULL`, (): void => {
    dummyFetchAction = jest.fn();
    dummyFetchedPropSelector = jest.fn((state: AppState, props: { id: string }): ?DummyType => {
      const { id } = props;
      if (id === dummyFetchId) return dummyFetchedProp;
      else throw new Error(`This shouldnt happen`);
    });

    const enzymeWrapper = mount(
      <DummyProviders>
        <FetchWrapper
          render={dummyRender}
          renderPropsAndState={{}}
          fetchId={dummyFetchId}
          fetchAction={dummyFetchAction}
          fetchedPropSelector={dummyFetchedPropSelector}
        />
      </DummyProviders>,
    );

    expect(dummyFetchAction).toHaveBeenCalledTimes(0);
    expect(dummyRender).toHaveBeenCalledWith(dummyFetchedProp);
    expect(enzymeWrapper.find('PureFetchWrapper').text()).toContain('foo&bar');
  });

  it(`executes the passed fetchAction, when a custom fetchCondition returns TRUE`, (): void => {
    dummyFetchAction = jest.fn();
    dummyFetchedPropSelector = jest.fn((state: AppState, props: { id: string }): ?DummyType => {
      const { id } = props;
      if (id === dummyFetchId) return { ...dummyFetchedProp, fetchCondition: true };
      else throw new Error(`This shouldnt happen`);
    });
    const dummyFetchCondition = jest.fn((fetchedProp: ?DummyType): boolean => (fetchedProp != null && fetchedProp.fetchCondition === true));

    mount(
      <DummyProviders>
        <FetchWrapper
          render={dummyRender}
          renderPropsAndState={{}}
          fetchId={dummyFetchId}
          fetchAction={dummyFetchAction}
          fetchedPropSelector={dummyFetchedPropSelector}
          fetchCondition={dummyFetchCondition}
        />
      </DummyProviders>,
    );

    expect(dummyFetchAction).toHaveBeenCalledWith(dummyFetchId);
  });

  it(`does not execute the passed fetchAction, when a custom fetchCondition returns FALSE`, (): void => {
    dummyFetchAction = jest.fn();
    dummyFetchedPropSelector = jest.fn((state: AppState, props: { id: string }): ?DummyType => {
      const { id } = props;
      if (id === dummyFetchId) return dummyFetchedProp;
      else throw new Error(`This shouldnt happen`);
    });
    const dummyFetchCondition = jest.fn((fetchedProp: ?DummyType): boolean => (fetchedProp != null && fetchedProp.fetchCondition === true));

    mount(
      <DummyProviders>
        <FetchWrapper
          render={dummyRender}
          renderPropsAndState={{}}
          fetchId={dummyFetchId}
          fetchAction={dummyFetchAction}
          fetchedPropSelector={dummyFetchedPropSelector}
          fetchCondition={dummyFetchCondition}
        />
      </DummyProviders>,
    );

    expect(dummyFetchAction).toHaveBeenCalledTimes(0);
  });

});
