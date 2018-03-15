// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureLibraryPage } from '../LibraryPage';

describe(`LibraryPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureLibraryPage
        {...dummyTranslatorProps}
        topicIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
