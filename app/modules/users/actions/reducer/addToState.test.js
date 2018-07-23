// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`addToState`, (): void => {

  let dummyId: string;
  let dummyEmail: string;
  let dummyFirstName: string;
  let dummyLastName: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyEmail = 'test@test.be';
    dummyFirstName = 'Test';
    dummyLastName = 'Tester';
  });

  it(`returns an ADD_TO_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        id: dummyId,
        email: dummyEmail,
        firstName: dummyFirstName,
        lastName: dummyLastName,
      },
    };
    const actualAction = actions.addToState(dummyId, dummyEmail, dummyFirstName, dummyLastName);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`converts empty email and lastName values to NULL`, (): void => {
    const expectedAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        id: dummyId,
        email: null,
        firstName: dummyFirstName,
        lastName: null,
      },
    };
    const actualAction = actions.addToState(dummyId, '', dummyFirstName, '');

    expect(actualAction).toEqual(expectedAction);
  });

});
