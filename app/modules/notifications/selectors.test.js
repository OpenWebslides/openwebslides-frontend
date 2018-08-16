// @flow

import {
  getById,
  getAllById,
  getAll,
} from './selectors';
import * as m from './model';

const exampleState: any = {
  modules: {
    notifications: {
      '1': {
        id: '1',
        userId: '1',
        topicId: '1',
        type: m.notificationTypes.CREATE,
        timestamp: 1524490428,
      },
    },
  },
};

describe(`selectors`, (): void => {
  describe(`getById`, (): void => {
    it(`gets event from the state`, (): void => {
      expect(getById(exampleState, '1')).toEqual({
        id: '1',
        userId: '1',
        topicId: '1',
        type: m.notificationTypes.CREATE,
        timestamp: 1524490428,
      });
    });

    it(`gets nothing from the state`, (): void => {
      expect(getById(exampleState, '2')).toBeUndefined();
    });
  });

  describe(`getAllById`, (): void => {
    it(`gets all events from the state by id`, (): void => {
      expect(getAllById(exampleState)).toEqual({
        '1': {
          id: '1',
          userId: '1',
          topicId: '1',
          type: m.notificationTypes.CREATE,
          timestamp: 1524490428,
        },
      });
    });
  });

  describe(`getAll`, (): void => {
    it(`gets all events from the state`, (): void => {
      expect(getAll(exampleState)).toEqual([{
        id: '1',
        userId: '1',
        topicId: '1',
        type: m.notificationTypes.CREATE,
        timestamp: 1524490428,
      }]);
    });
  });
});
