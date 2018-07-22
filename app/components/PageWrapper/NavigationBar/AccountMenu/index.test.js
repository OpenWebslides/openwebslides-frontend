// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureAccountMenu } from '.';

describe(`AccountMenu`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccountMenu
        {...dummyProviderProps.translatorProps}
        currentUser={null}
        onSignout={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
