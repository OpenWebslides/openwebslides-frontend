// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { SidebarsState } from '../model';
import { sidebar } from '../model/sidebarName';

describe(`reducer`, (): void => {
  const dummySidebar1 = sidebar.SLIDE;
  const dummySidebar2 = sidebar.INFO;

  const dummySidebarsByName = [dummySidebar1];

  const dummyInitialState = {
    byName: [],
  };

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction = {
      type: t.TOGGLE_ERROR,
      error: {
        message: `Flow will complain if the passed action isn't some kind of valid TopicAction.`,
      },
    };

    expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
  });

  it(`handles sidebar TOGGLE action. Payload contains a new Sidebar`, (): void => {
    const prevState: SidebarsState = {
      byName: dummySidebarsByName,
    };
    const toggleAction: t.ToggleAction = {
      type: t.TOGGLE,
      payload: {
        sidebarName: dummySidebar2,
      },
    };
    const nextState: SidebarsState = {
      byName: [dummySidebar1, dummySidebar2],
    };

    expect(reducer(prevState, toggleAction)).toEqual(nextState);
  });

  it(`handles sidebar TOGGLE action. Payload contains a duplicate Sidebar`, (): void => {
    const prevState: SidebarsState = {
      byName: dummySidebarsByName,
    };
    const toggleAction: t.ToggleAction = {
      type: t.TOGGLE,
      payload: {
        sidebarName: dummySidebar1,
      },
    };
    const nextState: SidebarsState = {
      byName: [],
    };

    expect(reducer(prevState, toggleAction)).toEqual(nextState);
  });

});
