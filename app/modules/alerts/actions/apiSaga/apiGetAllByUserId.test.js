// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiGetAllByUserId`, (): void => {

  let dummyUserId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
  });

  it(`returns a alerts API_GET_ALL_BY_USER_ID action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiGetAllByUserIdAction = {
      type: a.API_GET_ALL_BY_USER_ID,
      payload: {
        userId: dummyUserId,
      },
    };
    const actualAction = actions.apiGetAllByUserId(dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
