// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureApiDimmer } from '../ApiDimmer';

describe(`ApiDimmer`, (): void => {
  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        request="foobar"
        active={true}
        {...dummyTranslatorProps}
      >
        Loading
      </PureApiDimmer>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders without errors with default loading text`, (): void => {
    const enzymeWrapper = shallow(
      <PureApiDimmer
        request="foobar"
        active={true}
        {...dummyTranslatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });
});
