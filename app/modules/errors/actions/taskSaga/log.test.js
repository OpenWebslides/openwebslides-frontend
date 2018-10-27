// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`log`, (): void => {

  let dummyError: Error;

  beforeEach((): void => {
    dummyError = new Error('dummy');
  });

  it(`returns a errors LOG action containing the passed arguments`, (): void => {
    const expectedAction: a.LogAction = {
      type: a.LOG,
      payload: {
        errorObject: dummyError,
      },
    };
    const actualAction = actions.log(dummyError);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
