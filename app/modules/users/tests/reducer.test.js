// @flow

import { dummyUsers } from '../dummyData';
import reducer from '../reducer';
import * as t from '../actionTypes';

import type { User, UsersState } from '../model';


describe(`reducer`, (): void => {

  const dummyUser1: $Exact<User> = {
    id: 'abcdefghij',
    firstName: 'Jan',
    lastName: 'Jansen',
    email: 'jan.jansen@email.com',
    password: 'janswachtwoord',
  };

  const dummyInitialState = dummyUsers;

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction = {
      type: t.ADD_ERROR,
      error: {
        message: `Flow will complain if the passed action isn't some kind of valid UserAction.`,
      },
    };

    expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
  });

  it(`handles user ADD action`, (): void => {
    const prevState: UsersState = {
      [dummyUser1.id]: dummyUser1,
    };

    const addAction: t.AddAction = {
      type: t.ADD,
      payload: {
        id: 'klmnopqrst',
        firstName: 'Cucumber',
        lastName: 'Tennismatch',
        email: 'cucumber.tennismatch@email.com',
        password: 'cucumberswachtwoord',
      },
    };

    const nextState: UsersState = {
      [dummyUser1.id]: dummyUser1,
      klmnopqrst: {
        id: 'klmnopqrst',
        firstName: 'Cucumber',
        lastName: 'Tennismatch',
        email: 'cucumber.tennismatch@email.com',
        password: 'cucumberswachtwoord',
      },
    };

    expect(reducer(prevState, addAction)).toEqual(nextState);
  });
});
