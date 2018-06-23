// @flow

import * as t from '../../actionTypes';
import { indent } from '../../actions';

describe(`indent`, (): void => {

  it(`returns a contentItem INDENT action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const expectedAction: t.IndentAction = {
      type: t.INDENT,
      payload: {
        id: dummyId,
      },
    };
    expect(indent(dummyId)).toEqual(expectedAction);
  });

});
