// @flow

import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';
import { contextTypes } from '../../model';

describe(`removeFromState`, (): void => {

  it(`returns a contentItem REMOVE_FROM_STATE action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const dummyContext = {
      contextType: contextTypes.PARENT,
      contextItemId: 'uvwxyzabcdefghijklmn',
    };
    const expectedAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyId,
        context: dummyContext,
      },
    };
    expect(removeFromState(dummyId, dummyContext)).toEqual(expectedAction);
  });

});
