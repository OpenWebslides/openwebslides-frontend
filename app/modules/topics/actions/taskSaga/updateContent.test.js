// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`updateContent`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics UPDATE_CONTENT action containing the passed arguments`, (): void => {
    const expectedAction: a.UpdateContentAction = {
      type: a.UPDATE_CONTENT,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.updateContent(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
