// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyRead: boolean;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyRead = true;
  });

  it(`returns a alerts API_PATCH action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPatchAction = {
      type: a.API_PATCH,
      payload: {
        id: dummyId,
        read: dummyRead,
      },
    };
    const actualAction = actions.apiPatch(dummyId, dummyRead);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
