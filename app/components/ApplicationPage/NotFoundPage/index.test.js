// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureNotFoundPage } from '.';

describe(`NotFoundPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNotFoundPage
        {...dummyProviderProps.translatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
