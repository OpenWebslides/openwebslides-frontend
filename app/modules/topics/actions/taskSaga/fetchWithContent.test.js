// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`fetchWithContent`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics FETCH_WITH_CONTENT action cotaining the passed arguments`, (): void => {
    const expectedAction: a.FetchWithContentAction = {
      type: a.FETCH_WITH_CONTENT,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.fetchWithContent(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
