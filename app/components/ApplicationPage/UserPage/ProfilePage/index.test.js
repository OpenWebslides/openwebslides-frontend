// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureProfilePage } from '.';

describe(`ProfilePage`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyAccount = {
      id: 'johanjohan',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    };

    const enzymeWrapper = shallow(
      <PureProfilePage
        {...dummyProviderProps.translatorProps}
        {...dummyProviderProps.routerProps}
        account={dummyAccount}
        userId="abcdefghij"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
