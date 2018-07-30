// @flow

import { InvalidArgumentError } from 'errors';

import * as a from '../../actionTypes';

import actions from '..';

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
