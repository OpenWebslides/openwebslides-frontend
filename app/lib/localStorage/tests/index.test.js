// @flow

import { loadState, saveState } from '..';

import type { PersistedState } from '..';

describe(`localStorage`, (): void => {
  beforeAll((): void => {
    localStorage.clear();
  });

  describe(`loadState`, (): void => {
    it(`returns undefined`, (): void => {
      expect(loadState()).toBeUndefined();
    });

    it(`returns local state`, (): void => {
      localStorage.setItem('ows_state', '{"state": "local"}');

      expect(loadState()).toEqual({
        state: 'local',
      });
    });
  });

  describe(`saveState`, (): void => {
    it(`sets item`, (): void => {
      const state: PersistedState = {
        modules: {
          authentication: {},
        },
      };

      saveState(state);

      const expectedStorage = '{"modules":{"authentication":{}}}';

      expect(localStorage.getItem('ows_state')).toEqual(expectedStorage);
    });
  });
});
