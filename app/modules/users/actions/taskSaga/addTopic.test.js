// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`addTopic`, (): void => {

  let dummyUserId: string;
  let dummyTopicTitle: string;
  let dummyTopicDescription: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicTitle = 'Lorem ipsum';
    dummyTopicDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  });

  it(`returns a users ADD_TOPIC action containing the passed arguments`, (): void => {
    const expectedAction: a.AddTopicAction = {
      type: a.ADD_TOPIC,
      payload: {
        id: dummyUserId,
        title: dummyTopicTitle,
        description: dummyTopicDescription,
      },
    };
    const actualAction = actions.addTopic(dummyUserId, dummyTopicTitle, dummyTopicDescription);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`defaults the description value to NULL, when no description is passed`, (): void => {
    const expectedAction: a.AddTopicAction = {
      type: a.ADD_TOPIC,
      payload: {
        id: dummyUserId,
        title: dummyTopicTitle,
        description: null,
      },
    };
    const actualAction = actions.addTopic(dummyUserId, dummyTopicTitle);

    expect(actualAction).toEqual(expectedAction);
  });

});
