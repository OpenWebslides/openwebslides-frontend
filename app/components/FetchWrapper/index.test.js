// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { type State } from 'types/state';
import { DummyProviders } from 'lib/testResources';

import FetchWrapper, { PureFetchWrapper } from '.';

type DummyType = {| foo: string, bar: string |};

describe(`FetchWrapper`, (): void => {

  let dummyFetchedProp: DummyType;
  let dummyRender: (DummyType) => React.Node;
  let dummyFetchId: string;
  let dummyFetchAction: (id: string) => {};
  let dummyFetchedPropSelector: (state: State, { id: string }) => ?DummyType;

  beforeEach((): void => {
    dummyFetchedProp = { foo: 'foo', bar: 'bar' };
    dummyRender = jest.fn((fetchedProp: DummyType): React.Node => <p>{`${fetchedProp.foo}&${fetchedProp.bar}`}</p>);
    dummyFetchId = 'dummyId';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureFetchWrapper
        render={dummyRender}
        fetchId={dummyFetchId}
        fetchAction={jest.fn()}
        fetchedPropSelector={jest.fn()}
        fetch={jest.fn()}
        fetchedProp={dummyFetchedProp}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders NULL and executes the passed fetchAction, when the passed fetchedPropSelector returns NULL`, (): void => {
    dummyFetchAction = jest.fn();
    dummyFetchedPropSelector = jest.fn((state: State, props: { id: string }): ?DummyType => {
      const { id } = props;
      if (id === dummyFetchId) return null;
      else throw new Error(`This shouldnt happen`);
    });

    const enzymeWrapper = mount(
      <DummyProviders>
        <FetchWrapper
          render={dummyRender}
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
    dummyFetchedPropSelector = jest.fn((state: State, props: { id: string }): ?DummyType => {
      const { id } = props;
      if (id === dummyFetchId) return dummyFetchedProp;
      else throw new Error(`This shouldnt happen`);
    });

    const enzymeWrapper = mount(
      <DummyProviders>
        <FetchWrapper
          render={dummyRender}
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

});
