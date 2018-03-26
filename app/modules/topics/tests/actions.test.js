// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as actions from '../actions';
import * as t from '../actionTypes';

describe(`actions`, (): void => {

  describe(`add`, (): void => {

    it(`returns a topic ADD action, when parameters are valid`, (): void => {
      const userId = 'testtest12';
      const title = 'Lorem ipsum';
      const description = 'Lorem ipsum dolor sit amet';
      const rootContentItemId = 'abcdefghij';
      const expectedAction: t.AddAction = {
        type: t.ADD,
        payload: {
          id: '',
          userId,
          title,
          description,
          rootContentItemId,
        },
      };
      const generatedAction: t.AddAction = ((actions.add(title, description): any): t.AddAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.id.length).toEqual(10);
      expect(generatedAction.payload.title).toEqual(expectedAction.payload.title);
      expect(generatedAction.payload.description).toEqual(expectedAction.payload.description);
      expect(generatedAction.payload.rootContentItemId)
        .toEqual(expectedAction.payload.rootContentItemId);
    });

    it(`returns a topic ADD_ERROR action, when title parameter is an empty string`, (): void => {
      const userId = 'testtest12';
      const title = '';
      const description = null;
      const expectedAction: t.AddErrorAction = {
        type: t.ADD_ERROR,
        error: {
          message: 'Title cannot be empty.',
        },
      };

      expect(actions.add(userId, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic ADD action with description an empty string, when description parameter is NULL`, (): void => {
      const userId = 'testtest12';
      const title = 'Lorem ipsum';
      const description = null;
      const expectedAction: t.AddAction = {
        type: t.ADD,
        payload: {
          id: '',
          userId,
          title,
          description: '',
          rootContentItemId: '',
        },
      };
      // eslint-disable-next-line
      const generatedAction: t.AddAction = ((actions.add(userId, title, description): any): t.AddAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.description).toEqual(expectedAction.payload.description);
    });

  });

  describe(`edit`, (): void => {

    it(`returns a topic EDIT action, when parameters are valid`, (): void => {
      const id = 'abcdefghij';
      const title = 'Lorem ipsum';
      const description = 'Lorem ipsum dolor sit amet';
      const expectedAction: t.EditAction = {
        type: t.EDIT,
        payload: {
          id,
          title,
          description,
        },
      };

      expect(actions.edit(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT action with title set to NULL, when title parameter is NULL`, (): void => {
      const id = 'abcdefghij';
      const title = null;
      const description = 'Lorem ipsum dolor sit amet';
      const expectedAction: t.EditAction = {
        type: t.EDIT,
        payload: {
          id,
          title,
          description,
        },
      };

      expect(actions.edit(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT_ERROR action, when title parameter is an empty string`, (): void => {
      const id = 'abcdefghij';
      const title = '';
      const description = null;
      const expectedAction: t.EditErrorAction = {
        type: t.EDIT_ERROR,
        error: {
          message: 'Title cannot be empty.',
        },
      };

      expect(actions.edit(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT action with description set to NULL, when description parameter is NULL`, (): void => {
      const id = 'abcdefghij';
      const title = 'Lorem ipsum';
      const description = null;
      const expectedAction: t.EditAction = {
        type: t.EDIT,
        payload: {
          id,
          title,
          description,
        },
      };

      expect(actions.edit(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT action with description set to an empty string, when description parameter is an empty string`, (): void => {
      const id = 'abcdefghij';
      const title = null;
      const description = '';
      const expectedAction: t.EditAction = {
        type: t.EDIT,
        payload: {
          id,
          title,
          description,
        },
      };

      expect(actions.edit(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT_ERROR action, when all editable properties are NULL`, (): void => {
      const id = 'abcdefghij';
      const title = null;
      const description = null;
      const expectedAction: t.EditErrorAction = {
        type: t.EDIT_ERROR,
        error: {
          message: 'Action must contain at least one edit.',
        },
      };

      expect(actions.edit(id, title, description)).toEqual(expectedAction);
    });

  });

  describe(`remove`, (): void => {

    it(`returns a topic REMOVE action, when parameters are valid`, (): void => {
      const id = 'abcdefghij';
      const expectedAction: t.RemoveAction = {
        type: t.REMOVE,
        payload: {
          id,
        },
      };

      expect(actions.remove(id)).toEqual(expectedAction);
    });

  });

});
