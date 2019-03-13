// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureBackButton } from '.';

describe(`BackButton`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureBackButton {...dummyProviderProps.routerProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
