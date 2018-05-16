// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureApiDimmer } from '../ApiDimmer';

describe(`ApiDimmer`, (): void => {

  it(`renders without errors`, (): void => {

    const enzymeWrapper = shallow(
      <PureApiDimmer request="foobar" active={true}>Loading</PureApiDimmer>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
