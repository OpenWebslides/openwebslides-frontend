// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { SidebarsState } from '../model';

describe(`reducer`, (): void => {
  const dummySidebarsByName = ['SidebarName/SLIDE'];
  const dummySidebar = 'SidebarName/SLIDE';

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
        sidebarName: 'SidebarName/INFO',
      },
    };
    const nextState: SidebarsState = {
      byName: [dummySidebar, 'SidebarName/INFO'],
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
        sidebarName: dummySidebar,
      },
    };
    const nextState: SidebarsState = {
      byName: [],
    };

    expect(reducer(prevState, toggleAction)).toEqual(nextState);
  });

});
