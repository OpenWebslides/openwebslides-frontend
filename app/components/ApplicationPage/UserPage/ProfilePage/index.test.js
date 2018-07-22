// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyTranslatorProps, dummyRouterProps } from 'config/tests';

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
        {...dummyTranslatorProps}
        {...dummyRouterProps}
        account={dummyAccount}
        userId="abcdefghij"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
