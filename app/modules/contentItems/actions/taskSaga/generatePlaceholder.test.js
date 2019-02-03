// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`generatePlaceholder`, (): void => {

  let dummyRootContentItemId: string;

  beforeEach((): void => {
    dummyRootContentItemId = 'dummyRootContentItemId';
  });

  it(`returns a contentItems GENERATE_PLACEHOLDER action containing the passed arguments`, (): void => {
    const expectedAction: a.GeneratePlaceholderAction = {
      type: a.GENERATE_PLACEHOLDER,
      payload: {
        rootContentItemId: dummyRootContentItemId,
      },
    };
    const actualAction = actions.generatePlaceholder(dummyRootContentItemId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
