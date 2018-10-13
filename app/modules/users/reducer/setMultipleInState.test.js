// @flow

import { dummyUserData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`addToState`, (): void => {

  let dummyUser1: m.User;
  let dummyUser2: m.User;
  let dummyUser3: m.User;

  beforeEach((): void => {
    dummyUser1 = { ...dummyUserData.user };
    dummyUser2 = { ...dummyUserData.user2 };
    dummyUser3 = { ...dummyUserData.user3 };
  });

  it(`sets the passed users in the state`, (): void => {
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        users: [dummyUser2, dummyUser3],
      },
    };
    const nextState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
        [dummyUser2.id]: dummyUser2,
        [dummyUser3.id]: dummyUser3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`overrides existing users, if any of the passed users' ids already exist in the state`, (): void => {
    const dummyChangedUser1 = { ...dummyUser1, email: 'changed.email@test.be' };
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        users: [dummyChangedUser1, dummyUser2],
      },
    };
    const nextState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyChangedUser1,
        [dummyUser2.id]: dummyUser2,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyUser1.id]).not.toBe(prevState.byId[dummyUser1.id]);
  });

  it(`does not change the state object, when the passed users array is empty`, (): void => {
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: dummyUser1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        users: [],
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
  });

});
