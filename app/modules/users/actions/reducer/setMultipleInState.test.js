// @flow

import { dummyUserData } from 'lib/testResources';

import * as a from '../../actionTypes';

import actions from '..';

describe(`setMultipleInState`, (): void => {

  it(`returns a SET_MULTIPLE_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        users: [dummyUserData.user, dummyUserData.user2],
      },
    };
    const actualAction = actions.setMultipleInState([dummyUserData.user, dummyUserData.user2]);

    expect(actualAction).toEqual(expectedAction);
  });

});
