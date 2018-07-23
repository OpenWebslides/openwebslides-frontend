// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps, dummyUserData } from 'lib/testResources';

import * as m from '../../model';

import { PureUserAccountMenu } from '.';

describe(`UserAccountMenu`, (): void => {

  let dummyUser: m.User;

  beforeEach((): void => {
    dummyUser = { ...dummyUserData.user };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUserAccountMenu
        {...dummyProviderProps.translatorProps}
        userId={dummyUser.id}
        user={dummyUser}
        fetchUser={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  // #TODO

});
