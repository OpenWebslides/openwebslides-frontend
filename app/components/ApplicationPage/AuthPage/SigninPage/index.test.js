// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureSigninPage } from '.';

describe(`SigninPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSigninPage
        {...dummyTranslatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
