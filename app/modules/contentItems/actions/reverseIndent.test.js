// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

import actions from '.';

describe(`reverseIndent`, (): void => {

  let dummyId: Identifier;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem REVERSE_INDENT action containing the passed props`, (): void => {
    const expectedAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.reverseIndent(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
