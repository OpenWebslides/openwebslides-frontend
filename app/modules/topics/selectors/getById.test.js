// @flow

import { dummyTopicData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getById`, (): void => {

  let dummyTopic1: m.Topic;
  let dummyTopic2: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyTopicsState: m.TopicsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyTopic1 = { ...dummyTopicData.topic };
    dummyTopic2 = { ...dummyTopicData.topic2 };
    dummyTopicsById = {
      [dummyTopic1.id]: dummyTopic1,
      [dummyTopic2.id]: dummyTopic2,
    };
    dummyTopicsState = { byId: dummyTopicsById };
    dummyState = { modules: { topics: dummyTopicsState } };
  });

  it(`returns the correct topic for the given id, when the given id is valid`, (): void => {
    const topic = selectors.getById(dummyState, { id: dummyTopic1.id });
    expect(topic).toBe(dummyTopic1);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const topic = selectors.getById(dummyState, { id: 'InvalidId' });
    expect(topic).toBeNull();
  });

});
