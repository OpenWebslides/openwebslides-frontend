// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { SidebarsState } from '../model';
import { sidebar } from '../model';

describe(`reducer`, (): void => {
  const dummySidebar1 = sidebar.SLIDE;
  const dummySidebar2 = sidebar.INFO;

  const dummySidebarsByName = [dummySidebar1];

  it(`handles sidebar TOGGLE action. Payload contains a new Sidebar`, (): void => {
    const prevState: SidebarsState = {
      activeSidebars: dummySidebarsByName,
    };
    const toggleAction: t.ToggleAction = {
      type: t.TOGGLE,
      payload: {
        sidebarName: dummySidebar2,
      },
    };
    const nextState: SidebarsState = {
      activeSidebars: [dummySidebar1, dummySidebar2],
    };

    expect(reducer(prevState, toggleAction)).toEqual(nextState);
  });

  it(`handles sidebar TOGGLE action. Payload contains a duplicate Sidebar`, (): void => {
    const prevState: SidebarsState = {
      activeSidebars: dummySidebarsByName,
    };
    const toggleAction: t.ToggleAction = {
      type: t.TOGGLE,
      payload: {
        sidebarName: dummySidebar1,
      },
    };
    const nextState: SidebarsState = {
      activeSidebars: [],
    };

    expect(reducer(prevState, toggleAction)).toEqual(nextState);
  });

});
