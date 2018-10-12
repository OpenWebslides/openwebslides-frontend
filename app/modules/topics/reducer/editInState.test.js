// @flow

import { ObjectNotFoundError } from 'errors';
import { dummyTopicData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`reducer`, (): void => {

  let dummyTopic1: m.Topic;
  let dummyTopic2: m.Topic;
  let editedTitle: string;
  let editedDescription: string;

  beforeEach((): void => {
    dummyTopic1 = { ...dummyTopicData.topic };
    dummyTopic2 = { ...dummyTopicData.topic2 };
    editedTitle = 'Edited title';
    editedDescription = 'Edited description';
  });

  it(`replaces the passed editedProps in the state for the topic with the passed id`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const editInStateAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: dummyTopic2.id,
        editedProps: {
          title: editedTitle,
          description: editedDescription,
        },
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: {
          ...dummyTopic2,
          title: editedTitle,
          description: editedDescription,
        },
      },
    };
    const resultState = reducer(prevState, editInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyTopic2.id]).not.toBe(prevState.byId[dummyTopic2.id]);
  });

  it(`sets a topic's description to NULL, when the passed edited description is NULL`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const editInStateAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: dummyTopic2.id,
        editedProps: {
          title: editedTitle,
          description: null,
        },
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: {
          ...dummyTopic2,
          title: editedTitle,
          description: null,
        },
      },
    };
    const resultState = reducer(prevState, editInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyTopic2.id]).not.toBe(prevState.byId[dummyTopic2.id]);
  });

  it(`does not change a topic's description, when no edited description is passed`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const editInStateAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: dummyTopic2.id,
        editedProps: {
          title: editedTitle,
        },
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: {
          ...dummyTopic2,
          title: editedTitle,
        },
      },
    };
    const resultState = reducer(prevState, editInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyTopic2.id]).not.toBe(prevState.byId[dummyTopic2.id]);
  });

  it(`returns the state object unchanged, when the action contains no editedProps`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const editInStateAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: dummyTopic2.id,
        editedProps: {},
      },
    };
    const resultState = reducer(prevState, editInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyTopic2.id]).toBe(prevState.byId[dummyTopic2.id]);
  });

  it(`returns the state object unchanged, when the action contains no meaningful edits`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const editInStateAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: dummyTopic2.id,
        editedProps: {
          title: dummyTopic2.title,
          description: dummyTopic2.description,
        },
      },
    };
    const resultState = reducer(prevState, editInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyTopic2.id]).toBe(prevState.byId[dummyTopic2.id]);
  });

  it(`throws an ObjectNotFoundError, when the topic for the passed id could not be found in the state`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
        [dummyTopic2.id]: dummyTopic2,
      },
    };
    const editInStateAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: 'InvalidId',
        editedProps: {},
      },
    };

    expect((): void => {
      reducer(prevState, editInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
