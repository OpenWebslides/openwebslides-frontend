// @flow

import { dummyTopicData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAllById`, (): void => {

  let dummyTopic1: m.Topic;
  let dummyTopic2: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyTopicsState: m.TopicsState;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyTopic1 = { ...dummyTopicData.topic };
    dummyTopic2 = { ...dummyTopicData.topic2 };
    dummyTopicsById = {
      [dummyTopic1.id]: dummyTopic1,
      [dummyTopic2.id]: dummyTopic2,
    };
    dummyTopicsState = { byId: dummyTopicsById };
    dummyState = { modules: { topics: dummyTopicsState } };
    dummyEmptyState = { modules: { topics: { byId: {} } } };
  });

  it(`returns an object mapping all topic ids to their topics, when there are one or more topics in the state`, (): void => {
    const topicsById = selectors.getAllById(dummyState);
    expect(topicsById).toBe(dummyTopicsById);
  });

  it(`returns an empty object, when there are no topics in the state`, (): void => {
    const topicsById = selectors.getAllById(dummyEmptyState);
    expect(topicsById).toEqual({});
  });

});
