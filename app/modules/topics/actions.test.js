// @flow

import { InvalidArgumentError, UnsupportedOperationError } from 'errors';

import * as actions from './actions';
import * as a from './actionTypes';

describe(`actions`, (): void => {

  describe(`addToState`, (): void => {

    it(`returns a topic ADD_TO_STATE action, when parameters are valid`, (): void => {
      const id = 'testuserid';
      const userId = 'testtest12';
      const title = 'Lorem ipsum';
      const description = 'Lorem ipsum dolor sit amet';
      const rootContentItemId = 'abcdefghij';
      const expectedAction: a.AddToStateAction = {
        type: a.ADD_TO_STATE,
        payload: {
          id,
          userId,
          title,
          description,
          rootContentItemId,
        },
      };
      // eslint-disable-next-line
      const generatedAction: a.AddToStateAction = ((actions.addToState(id, userId, title, description, rootContentItemId): any): a.AddToStateAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.id).toHaveLength(10);
      expect(generatedAction.payload.title).toEqual(expectedAction.payload.title);
      expect(generatedAction.payload.description).toEqual(expectedAction.payload.description);
      /* TODO uncomment when rootcontentItemId are created with new topic
      expect(generatedAction.payload.rootContentItemId)
        .toEqual(expectedAction.payload.rootContentItemId);
      */
    });

    it(`throws an InvalidArgumentError when title parameter is an empty string`, (): void => {
      const id = 'testuserid';
      const userId = 'testtest12';
      const title = '';
      const description = null;
      const rootContentItemId = 'abcdefghij';

      expect((): void => {
        actions.addToState(id, userId, title, description, rootContentItemId);
      }).toThrow(InvalidArgumentError);
    });

    it(`returns a topic ADD_TO_STATE action with description an empty string, when description parameter is NULL`, (): void => {
      const id = 'testuserid';
      const userId = 'testtest12';
      const title = 'Lorem ipsum';
      const description = null;
      const rootContentItemId = 'abcdefghij';
      const expectedAction: a.AddToStateAction = {
        type: a.ADD_TO_STATE,
        payload: {
          id,
          userId,
          title,
          description: '',
          rootContentItemId: '',
        },
      };
      // eslint-disable-next-line
      const generatedAction: a.AddToStateAction = ((actions.addToState(id, userId, title, description, rootContentItemId): any): a.AddToStateAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.description).toEqual(expectedAction.payload.description);
    });

  });

  describe(`edit`, (): void => {

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

  describe(`removeFromState`, (): void => {

    it(`returns a topic REMOVE_FROM_STATE action, when parameters are valid`, (): void => {
      const id = 'abcdefghij';
      const expectedAction: a.RemoveFromStateAction = {
        type: a.REMOVE_FROM_STATE,
        payload: {
          id,
        },
      };

      expect(actions.removeFromState(id)).toEqual(expectedAction);
    });

  });

  describe(`save`, (): void => {
    it(`returns a SAVE action`, (): void => {
      const id = 'abcdefghij';
      const expectedAction: a.SaveContentAction = {
        type: a.SAVE,
        payload: {
          id,
        },
      };

      expect(actions.save(id)).toEqual(expectedAction);
    });
  });

  describe(`load`, (): void => {
    it(`returns a LOAD action`, (): void => {
      const id = 'abcdefghij';
      const expectedAction: a.LoadContentAction = {
        type: a.LOAD,
        payload: {
          id,
        },
      };

      expect(actions.load(id)).toEqual(expectedAction);
    });
  });

  describe(`apiPatchContent`, (): void => {
    it(`returns a API_PATCH_CONTENT action`, (): void => {
      const id = 'abcdefghij';
      const content = [];
      const expectedAction: a.ApiPatchTopicContentAction = {
        type: a.API_PATCH_CONTENT,
        payload: {
          id,
          content,
        },
      };

      expect(actions.apiPatchContent(id, content)).toEqual(expectedAction);
    });
  });

  describe(`apiGetContent`, (): void => {
    it(`returns a API_GET_CONTENT action`, (): void => {
      const id = 'abcdefghij';
      const expectedAction: a.ApiGetTopicContentAction = {
        type: a.API_GET_CONTENT,
        payload: {
          id,
        },
      };

      expect(actions.apiGetContent(id)).toEqual(expectedAction);
    });
  });

});