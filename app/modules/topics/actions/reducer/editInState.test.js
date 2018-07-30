// @flow

import { InvalidArgumentError, UnsupportedOperationError } from 'errors';

import * as a from '../../actionTypes';

import actions from '..';

describe(`editInState`, (): void => {

  it(`returns a topic EDIT_IN_STATE action, when parameters are valid`, (): void => {
    const id = 'abcdefghij';
    const title = 'Lorem ipsum';
    const description = 'Lorem ipsum dolor sit amet';
    const expectedAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id,
        title,
        description,
      },
    };

    expect(actions.editInState(id, title, description)).toEqual(expectedAction);
  });

  it(`returns a topic EDIT_IN_STATE action with title set to NULL, when title parameter is NULL`, (): void => {
    const id = 'abcdefghij';
    const title = null;
    const description = 'Lorem ipsum dolor sit amet';
    const expectedAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id,
        title,
        description,
      },
    };

    expect(actions.editInState(id, title, description)).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError when title parameter is an empty string`, (): void => {
    const id = 'abcdefghij';
    const title = '';
    const description = null;

    expect((): void => {
      actions.editInState(id, title, description);
    }).toThrow(InvalidArgumentError);
  });

  it(`returns a topic EDIT_IN_STATE action with description set to NULL, when description parameter is NULL`, (): void => {
    const id = 'abcdefghij';
    const title = 'Lorem ipsum';
    const description = null;
    const expectedAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id,
        title,
        description,
      },
    };

    expect(actions.editInState(id, title, description)).toEqual(expectedAction);
  });

  it(`returns a topic EDIT_IN_STATE action with description set to an empty string, when description parameter is an empty string`, (): void => {
    const id = 'abcdefghij';
    const title = null;
    const description = '';
    const expectedAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id,
        title,
        description,
      },
    };

    expect(actions.editInState(id, title, description)).toEqual(expectedAction);
  });

  it(`throws an UnsupportedOperationError when all editable properties are NULL`, (): void => {
    const id = 'abcdefghij';
    const title = null;
    const description = null;

    expect((): void => {
      actions.editInState(id, title, description);
    }).toThrow(UnsupportedOperationError);
  });

});
