// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureLibraryPage } from '.';

describe(`LibraryPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureLibraryPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
