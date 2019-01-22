// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
  });

  it(`returns a topics API_PATCH action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPatchAction = {
      type: a.API_PATCH,
      payload: {
        id: dummyId,
        title: dummyTitle,
        description: dummyDescription,
      },
    };
    const actualAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
