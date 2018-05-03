// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureLibraryPage } from '../LibraryPage';

const dummyDispatchProps = {
  handleRequestTopics: (): void => {},
};

describe(`LibraryPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureLibraryPage
        {...dummyTranslatorProps}
        {...dummyDispatchProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
