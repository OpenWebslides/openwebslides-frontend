// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

describe(`actions`, (): void => {

  describe(`addToState`, (): void => {

    it(`returns a topic ADD_TO_STATE action, when parameters are valid`, (): void => {
      const id = 'testuserid';
      const userId = 'testtest12';
      const title = 'Lorem ipsum';
      const description = 'Lorem ipsum dolor sit amet';
      const rootContentItemId = 'abcdefghij';
      const expectedAction: t.AddToStateAction = {
        type: t.ADD_TO_STATE,
        payload: {
          id,
          userId,
          title,
          description,
          rootContentItemId,
        },
      };
      // eslint-disable-next-line
      const generatedAction: t.AddToStateAction = ((actions.addToState(id, userId, title, description, rootContentItemId): any): t.AddToStateAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.id.length).toEqual(10);
      expect(generatedAction.payload.title).toEqual(expectedAction.payload.title);
      expect(generatedAction.payload.description).toEqual(expectedAction.payload.description);
      /* TODO uncomment when rootcontentItemId are created with new topic
      expect(generatedAction.payload.rootContentItemId)
        .toEqual(expectedAction.payload.rootContentItemId);
      */
    });

    it(`returns a topic ADD_TO_STATE_ERROR action, when title parameter is an empty string`, (): void => {
      const id = 'testuserid';
      const userId = 'testtest12';
      const title = '';
      const description = null;
      const rootContentItemId = 'abcdefghij';
      const expectedAction: t.AddToStateErrorAction = {
        type: t.ADD_TO_STATE_ERROR,
        error: {
          message: 'Title cannot be empty.',
        },
      };

      expect(actions.addToState(id, userId, title, description, rootContentItemId)).toEqual(expectedAction);
    });

    it(`returns a topic ADD_TO_STATE action with description an empty string, when description parameter is NULL`, (): void => {
      const id = 'testuserid';
      const userId = 'testtest12';
      const title = 'Lorem ipsum';
      const description = null;
      const rootContentItemId = 'abcdefghij';
      const expectedAction: t.AddToStateAction = {
        type: t.ADD_TO_STATE,
        payload: {
          id,
          userId,
          title,
          description: '',
          rootContentItemId: '',
        },
      };
      // eslint-disable-next-line
      const generatedAction: t.AddToStateAction = ((actions.addToState(id, userId, title, description, rootContentItemId): any): t.AddToStateAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.description).toEqual(expectedAction.payload.description);
    });

  });

  describe(`edit`, (): void => {

    it(`returns a topic EDIT_IN_STATE action, when parameters are valid`, (): void => {
      const id = 'abcdefghij';
      const title = 'Lorem ipsum';
      const description = 'Lorem ipsum dolor sit amet';
      const expectedAction: t.EditInStateAction = {
        type: t.EDIT_IN_STATE,
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
      const expectedAction: t.EditInStateAction = {
        type: t.EDIT_IN_STATE,
        payload: {
          id,
          title,
          description,
        },
      };

      expect(actions.editInState(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT_IN_STATE_ERROR action, when title parameter is an empty string`, (): void => {
      const id = 'abcdefghij';
      const title = '';
      const description = null;
      const expectedAction: t.EditInStateErrorAction = {
        type: t.EDIT_IN_STATE_ERROR,
        error: {
          message: 'Title cannot be empty.',
        },
      };

      expect(actions.editInState(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT_IN_STATE action with description set to NULL, when description parameter is NULL`, (): void => {
      const id = 'abcdefghij';
      const title = 'Lorem ipsum';
      const description = null;
      const expectedAction: t.EditInStateAction = {
        type: t.EDIT_IN_STATE,
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
      const expectedAction: t.EditInStateAction = {
        type: t.EDIT_IN_STATE,
        payload: {
          id,
          title,
          description,
        },
      };

      expect(actions.editInState(id, title, description)).toEqual(expectedAction);
    });

    it(`returns a topic EDIT_IN_STATE_ERROR action, when all editable properties are NULL`, (): void => {
      const id = 'abcdefghij';
      const title = null;
      const description = null;
      const expectedAction: t.EditInStateErrorAction = {
        type: t.EDIT_IN_STATE_ERROR,
        error: {
          message: 'Action must contain at least one edit.',
        },
      };

      expect(actions.editInState(id, title, description)).toEqual(expectedAction);
    });

  });

  describe(`removeFromState`, (): void => {

    it(`returns a topic REMOVE_FROM_STATE action, when parameters are valid`, (): void => {
      const id = 'abcdefghij';
      const expectedAction: t.RemoveFromStateAction = {
        type: t.REMOVE_FROM_STATE,
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
      const expectedAction: t.SaveContentAction = {
        type: t.SAVE,
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
      const expectedAction: t.LoadContentAction = {
        type: t.LOAD,
        payload: {
          id,
        },
      };

      expect(actions.load(id)).toEqual(expectedAction);
    });
  });

  describe(`apiPatchTopicContent`, (): void => {
    it(`returns a API_PATCH_CONTENT action`, (): void => {
      const id = 'abcdefghij';
      const contentItems = [];
      const expectedAction: t.ApiPatchTopicContentAction = {
        type: t.API_PATCH_CONTENT,
        payload: {
          id,
          contentItems,
        },
      };

      expect(actions.apiPatchTopicContent(id, contentItems)).toEqual(expectedAction);
    });
  });

  describe(`apiGetTopicContent`, (): void => {
    it(`returns a API_GET_CONTENT action`, (): void => {
      const id = 'abcdefghij';
      const expectedAction: t.ApiGetTopicContentAction = {
        type: t.API_GET_CONTENT,
        payload: {
          id,
        },
      };

      expect(actions.apiGetTopicContent(id)).toEqual(expectedAction);
    });
  });

});
