// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureSignupPage } from '.';

describe(`SignupPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSignupPage
        {...dummyTranslatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
