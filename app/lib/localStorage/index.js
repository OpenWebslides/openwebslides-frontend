// @flow

type PersistedState = {
  modules: {
    authentication: {},
  },
};

export const loadState = (): void => {
  try {
    const serializedState = localStorage.getItem('ows_state');
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch (error) {
    throw Error(`Error loading from local storage: ${error}`);
  }
};

export const saveState = (state: PersistedState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('ows_state', serializedState);
  }
  catch (error) {
    throw Error(`Error saving to local storage: ${error}`);
  }
};

export type { PersistedState };
