// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureNavigationBar } from '../NavigationBar';

describe(`NavigationBar`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNavigationBar
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
