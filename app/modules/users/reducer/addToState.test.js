// @flow

import { InvalidArgumentError } from 'errors';
import { dummyUserData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`addToState`, (): void => {

  let dummyUser1: m.User;
  let dummyUser2: m.User;

  beforeEach((): void => {
    dummyUser1 = { ...dummyUserData.user };
    dummyUser2 = { ...dummyUserData.user2 };
  });

  it(`adds a user to the state, when the passed props are valid`, (): void => {
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
      },
    };
    const addToStateAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        id: dummyUser2.id,
        email: dummyUser2.email,
        firstName: dummyUser2.firstName,
        lastName: dummyUser2.lastName,
      },
    };
    const nextState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
        [dummyUser2.id]: dummyUser2,
      },
    };
    const resultState = reducer(prevState, addToStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`throws an InvalidArgumentError, when a user for the passed id already exists in the state`, (): void => {
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
      },
    };
    const addToStateAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        id: dummyUser1.id,
        email: dummyUser1.email,
        firstName: dummyUser1.firstName,
        lastName: dummyUser1.lastName,
      },
    };

    expect((): void => {
      reducer(prevState, addToStateAction);
    }).toThrow(InvalidArgumentError);
  });

});
