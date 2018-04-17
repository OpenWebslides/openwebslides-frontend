// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

describe(`actions`, (): void => {

  describe(`add`, (): void => {
    it(`returns a user ADD action, when parameters are valid, and user entered a last name`, (): void => {
      const firstName = 'Jan';
      const lastName = 'Jansen';
      const email = 'jan.jansen@email.com';
      const password = 'janspaswoord';
      const expectedAction: t.AddAction = {
        type: t.ADD,
        payload: {
          id: '',
          firstName,
          lastName,
          email,
          password,
        },
      };

      const generatedAction: t.AddAction = ((actions.add(firstName, lastName, email, password): any): t.AddAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.id.length).toEqual(10);
      expect(generatedAction.payload.firstName).toEqual(expectedAction.payload.firstName);
      expect(generatedAction.payload.lastName).toEqual(expectedAction.payload.lastName);
      expect(generatedAction.payload.email).toEqual(expectedAction.payload.email);
      expect(generatedAction.payload.password).toEqual(expectedAction.payload.password);
    });

    it(`returns a user ADD action with lastName an empty string, when lastName parameter is NULL`, (): void => {
      const firstName = 'Jan';
      const lastName = null;
      const email = 'jan.jansen@email.com';
      const password = 'janspaswoord';
      const expectedAction: t.AddAction = {
        type: t.ADD,
        payload: {
          id: '',
          firstName,
          lastName: '',
          email,
          password,
        },
      };

      const generatedAction: t.AddAction = ((actions.add(firstName, lastName, email, password): any): t.AddAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.lastName).toEqual(expectedAction.payload.lastName);
    });

    it(`returns a user ADD_ERROR action, when firstName parameter is an empty string`, (): void => {
      const firstName = '';
      const lastName = 'Jansen';
      const email = 'jan.jansen@email.com';
      const password = 'janspaswoord';
      const expectedAction: t.AddErrorAction = {
        type: t.ADD_ERROR,
        error: {
          message: 'First name cannot be empty.',
        },
      };

      expect(actions.add(firstName, lastName, email, password)).toEqual(expectedAction);
    });

    it(`returns a user ADD_ERROR action, when email parameter is an empty string`, (): void => {
      const firstName = 'Jan';
      const lastName = 'Jansen';
      const email = '';
      const password = 'janspaswoord';
      const expectedAction: t.AddErrorAction = {
        type: t.ADD_ERROR,
        error: {
          message: 'Email cannot be empty.',
        },
      };

      expect(actions.add(firstName, lastName, email, password)).toEqual(expectedAction);
    });

    it(`returns a user ADD_ERROR action, when password parameter is an empty string`, (): void => {
      const firstName = 'Jan';
      const lastName = 'Jansen';
      const email = 'jan.jansen@email.com';
      const password = '';
      const expectedAction: t.AddErrorAction = {
        type: t.ADD_ERROR,
        error: {
          message: 'Password cannot be empty.',
        },
      };

      expect(actions.add(firstName, lastName, email, password)).toEqual(expectedAction);
    });
  });
});
