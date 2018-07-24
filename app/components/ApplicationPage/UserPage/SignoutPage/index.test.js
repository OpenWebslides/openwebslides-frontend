// @flow

import * as React from 'react';
import { mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';
import platform from 'modules/platform';

import SignoutPage from '.';

describe(`SignoutPage`, (): void => {

  let dummyDispatch: *;

  beforeEach((): void => {
    dummyDispatch = jest.fn();
  });

  it(`dispatches a signout action on load`, (): void => {
    mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <SignoutPage />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(platform.actions.signout());
  });

});
