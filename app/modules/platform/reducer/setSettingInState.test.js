// @flow

import * as t from '../actionTypes';
import * as m from '../model';

import reducer, { initialState } from '.';

describe(`setSettingInState`, (): void => {

  it(`sets the passed key/value pair in the state`, (): void => {
    const dummyKey = 'activeSidebarIds';
    const dummyValue = [m.sidebarIds.TOPIC_INFO];

    const prevState: m.PlatformState = {
      ...initialState,
      settings: {
        ...initialState.settings,
      },
    };
    const setSettingInStateAction: t.SetSettingInStateAction = {
      type: t.SET_SETTING_IN_STATE,
      payload: {
        keyValuePair: { [dummyKey]: dummyValue },
      },
    };
    const nextState: m.PlatformState = {
      ...initialState,
      settings: {
        ...initialState.settings,
        [dummyKey]: dummyValue,
      },
    };
    const resultState = reducer(prevState, setSettingInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.settings).not.toBe(prevState.settings);
    expect(resultState.settings[dummyKey]).not.toBe(prevState.settings[dummyKey]);
  });

  it(`returns the passed state unchanged, when the passed value is identical to the previous value for the passed key`, (): void => {
    const prevState: m.PlatformState = {
      ...initialState,
      settings: {
        ...initialState.settings,
      },
    };
    const setSettingInStateAction: t.SetSettingInStateAction = {
      type: t.SET_SETTING_IN_STATE,
      payload: {
        keyValuePair: { activeSidebarIds: initialState.settings.activeSidebarIds },
      },
    };
    const resultState = reducer(prevState, setSettingInStateAction);

    expect(resultState).toBe(prevState);
  });

});
