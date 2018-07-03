// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

import actions from '.';

describe(`indent`, (): void => {

  let dummyId: Identifier;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem INDENT action containing the passed props`, (): void => {
    const expectedAction: t.IndentAction = {
      type: t.INDENT,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.indent(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
