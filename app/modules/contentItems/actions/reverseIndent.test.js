// @flow

import * as a from '../actionTypes';

import actions from '.';

describe(`reverseIndent`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem REVERSE_INDENT action containing the passed props`, (): void => {
    const expectedAction: a.ReverseIndentAction = {
      type: a.REVERSE_INDENT,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.reverseIndent(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
