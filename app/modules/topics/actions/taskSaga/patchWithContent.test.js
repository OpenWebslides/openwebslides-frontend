// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`patchWithContent`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics PATCH_WITH_CONTENT action containing the passed arguments`, (): void => {
    const expectedAction: a.PatchWithContentAction = {
      type: a.PATCH_WITH_CONTENT,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.patchWithContent(dummyId);

    expect(actualAction).toEqual(expectedAction);
  });

});
