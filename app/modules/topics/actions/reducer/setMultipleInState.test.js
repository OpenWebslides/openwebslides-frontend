// @flow

import { UnsupportedOperationError } from 'errors';
import { dummyTopicData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`setMultipleInState`, (): void => {

  let dummyTopic1: m.Topic;
  let dummyTopic2: m.Topic;

  beforeEach((): void => {
    dummyTopic1 = { ...dummyTopicData.topic };
    dummyTopic2 = { ...dummyTopicData.topic2 };
  });

  it(`returns a SET_MULTIPLE_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        topics: [dummyTopic1, dummyTopic2],
      },
    };
    const actualAction = actions.setMultipleInState([dummyTopic1, dummyTopic2]);

    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`throws an UnsupportedOperationError, when the passed topics array is empty`, (): void => {
    expect((): void => {
      actions.setMultipleInState([]);
    }).toThrow(UnsupportedOperationError);
  });

});
