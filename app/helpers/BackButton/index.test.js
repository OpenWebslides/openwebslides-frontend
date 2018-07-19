// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps, dummyRouterProps } from 'config/tests';

import { PureBackButton } from '.';

describe(`BackButton`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureBackButton {...dummyTranslatorProps} {...dummyRouterProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
