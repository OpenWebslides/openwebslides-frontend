// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps, dummyRouterMatchProps } from 'config/tests';

import { PureProfilePage } from '../ProfilePage';

describe(`ProfilePage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureProfilePage
        {...dummyTranslatorProps}
        {...dummyRouterMatchProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
