// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps } from 'config/tests';

import { PureLibraryHomePage } from '.';

describe(`LibraryHomePage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureLibraryHomePage
        {...dummyTranslatorProps}
        currentUserId="dummyUserId"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
