// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureHomePage } from '../HomePage';

describe(`HomePage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHomePage
        {...dummyTranslatorProps}
        feedItemIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
