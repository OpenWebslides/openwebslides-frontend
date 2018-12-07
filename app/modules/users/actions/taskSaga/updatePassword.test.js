// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`updatePassword`, (): void => {

  let dummyId: string;
  let dummyCurrentPassword: string;
  let dummyPassword: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyCurrentPassword = 'dummyCurrentPassword';
    dummyPassword = 'dummyPassword';
  });

  it(`returns a users UPDATE_PASSWORD action containing the passed props`, (): void => {
    const expectedAction: a.UpdatePasswordAction = {
      type: a.UPDATE_PASSWORD,
      payload: {
        id: dummyId,
        currentPassword: dummyCurrentPassword,
        password: dummyPassword,
      },
    };
    const actualAction = actions.updatePassword(dummyId, dummyCurrentPassword, dummyPassword);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
