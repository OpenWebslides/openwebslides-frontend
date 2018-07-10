// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

import actions from '.';

describe(`remove`, (): void => {

  let dummyId: Identifier;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem REMOVE action containing the passed props`, (): void => {
    const expectedAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.remove(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
