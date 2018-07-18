// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureSubmitButtonGroup } from './SubmitButtonGroup';

describe(`SubmitButtonGroup`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSubmitButtonGroup {...dummyTranslatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
