// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps, dummyRouterMatchProps } from 'config/tests';

import { PureProfilePage } from '../ProfilePage';

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
        {...dummyRouterMatchProps}
        account={dummyAccount}
        userId="abcdefghij"
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
