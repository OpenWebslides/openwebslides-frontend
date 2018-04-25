// @flow

import {
  getById,
  getAllById,
  getAll,
} from '../selectors';
import { predicateTypes } from '../model';

const exampleState = {
  modules: {
    feedItems: {
      '1': {
        id: '1',
        userId: '1',
        topicId: '1',
        predicate: predicateTypes.CREATE,
        timestamp: 1524490428,
      },
    },
  },
};

describe(`selectors`, (): void => {
  describe(`getById`, (): void => {
    it(`gets feed item from the state`, (): void => {
      // $FlowFixMe
      expect(getById(exampleState, '1')).toEqual({
        id: '1',
        userId: '1',
        topicId: '1',
        predicate: predicateTypes.CREATE,
        timestamp: 1524490428,
      });
    });

    it(`gets nothing from the state`, (): void => {
      // $FlowFixMe
      expect(getById(exampleState, '2')).toEqual(undefined);
    });
  });

  describe(`getAllById`, (): void => {
    it(`gets all feed item from the state by id`, (): void => {
      // $FlowFixMe
      expect(getAllById(exampleState)).toEqual({
        '1': {
          id: '1',
          userId: '1',
          topicId: '1',
          predicate: predicateTypes.CREATE,
          timestamp: 1524490428,
        },
      });
    });
  });

  describe(`getAll`, (): void => {
    it(`gets all feed items from the state`, (): void => {
      // $FlowFixMe
      expect(getAll(exampleState)).toEqual([{
        id: '1',
        userId: '1',
        topicId: '1',
        predicate: predicateTypes.CREATE,
        timestamp: 1524490428,
      }]);
    });
  });
});
