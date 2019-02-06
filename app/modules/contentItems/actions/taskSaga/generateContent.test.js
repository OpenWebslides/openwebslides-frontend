// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`generateContent`, (): void => {

  let dummyRootContentItemId: string;

  beforeEach((): void => {
    dummyRootContentItemId = 'dummyRootContentItemId';
  });

  it(`returns a contentItems GENERATE_CONTENT action containing the passed arguments`, (): void => {
    const expectedAction: a.GenerateContentAction = {
      type: a.GENERATE_CONTENT,
      payload: {
        rootContentItemId: dummyRootContentItemId,
      },
    };
    const actualAction = actions.generateContent(dummyRootContentItemId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
