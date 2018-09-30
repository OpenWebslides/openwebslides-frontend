// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`generateRoot`, (): void => {

  it(`returns a contentItems GENERATE_ROOT action containing the passed arguments`, (): void => {
    const expectedAction: a.GenerateRootAction = {
      type: a.GENERATE_ROOT,
      payload: {},
    };
    const actualAction = actions.generateRoot();

    expect(actualAction).toEqual(expectedAction);
  });

});
