// @flow

import * as t from '../../actionTypes';
import { remove } from '../../actions';

describe(`remove`, (): void => {

  it(`returns a contentItem REMOVE action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const expectedAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: dummyId,
      },
    };
    expect(remove(dummyId)).toEqual(expectedAction);
  });

});
