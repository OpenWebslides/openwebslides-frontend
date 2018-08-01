// @flow

import { dummyTopicData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`reducer`, (): void => {

  let dummyTopic1: m.Topic;

  beforeEach((): void => {
    dummyTopic1 = { ...dummyTopicData.topic };
  });

  it(`handles topic EDIT_IN_STATE action`, (): void => {
    const prevState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: dummyTopic1,
      },
    };
    const editAction: a.EditInStateAction = {
      type: a.EDIT_IN_STATE,
      payload: {
        id: dummyTopic1.id,
        title: 'Edited test topic',
        description: 'Description has been edited.',
      },
    };
    const nextState: m.TopicsState = {
      byId: {
        [dummyTopic1.id]: {
          ...dummyTopic1,
          title: 'Edited test topic',
          description: 'Description has been edited.',
        },
      },
    };

    expect(reducer(prevState, editAction)).toEqual(nextState);
  });

});
