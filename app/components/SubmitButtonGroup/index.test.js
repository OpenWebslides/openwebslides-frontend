// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureSubmitButtonGroup } from '.';

describe(`SubmitButtonGroup`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSubmitButtonGroup {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
