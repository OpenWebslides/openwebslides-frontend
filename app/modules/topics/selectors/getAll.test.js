// @flow

import { dummyTopicData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAll`, (): void => {

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

  it(`returns an array containing all topics, when there are one or more topics in the state`, (): void => {
    const topics = selectors.getAll(dummyState);
    expect(topics).toStrictEqual([dummyTopic1, dummyTopic2]);
  });

  it(`returns an empty array, when there are no topics in the state`, (): void => {
    const topics = selectors.getAll(dummyEmptyState);
    expect(topics).toStrictEqual([]);
  });

});
