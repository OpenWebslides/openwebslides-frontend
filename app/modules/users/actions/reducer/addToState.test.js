// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`addToState`, (): void => {

  let dummyId: string;
  let dummyEmail: string;
  let dummyName: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
  });

  it(`returns an ADD_TO_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        id: dummyId,
        email: dummyEmail,
        name: dummyName,
      },
    };
    const actualAction = actions.addToState(dummyId, dummyEmail, dummyName);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`converts empty email values to NULL`, (): void => {
    const expectedAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        id: dummyId,
        email: null,
        name: dummyName,
      },
    };
    const actualAction = actions.addToState(dummyId, '', dummyName);

    expect(actualAction).toEqual(expectedAction);
  });

});
