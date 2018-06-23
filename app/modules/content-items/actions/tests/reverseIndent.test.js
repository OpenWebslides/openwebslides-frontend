// @flow

import * as t from '../../actionTypes';
import { reverseIndent } from '../../actions';

describe(`reverseIndent`, (): void => {

  it(`returns a contentItem REVERSE_INDENT action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const expectedAction: t.ReverseIndentAction = {
      type: t.REVERSE_INDENT,
      payload: {
        id: dummyId,
      },
    };
    expect(reverseIndent(dummyId)).toEqual(expectedAction);
  });

});
