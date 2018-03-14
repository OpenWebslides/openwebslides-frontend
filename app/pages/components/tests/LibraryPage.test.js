// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureLibraryPage } from '../LibraryPage';

describe(`LibraryPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureLibraryPage
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
