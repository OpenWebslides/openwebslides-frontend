// @flow

import { getAllActiveSidebars } from '../selectors';
import type { SidebarName, SidebarsState } from '../model';
import { sidebar } from '../model';

describe(`selectors`, (): void => {

  const dummySidebarName1: SidebarName = sidebar.SLIDE;
  const dummySidebarName2: SidebarName = sidebar.INFO;

  const dummyActiveSidebars: Array<SidebarName> = [dummySidebarName1, dummySidebarName2];
  const dummySidebarsState: SidebarsState = {
    activeSidebars: dummyActiveSidebars,
  };
  const dummyState: any = {
    modules: {
      sidebars: dummySidebarsState,
    },
  };
  const dummyEmptyState: any = {
    modules: {
      sidebars: {
        activeSidebars: [],
      },
    },
  };

  describe(`getAllByName`, (): void => {

    it(`returns an array of all Sidebars, when there are one or more sidebars in the state`, (): void => {
      const sidebarsByName = getAllActiveSidebars(dummyState);
      expect(sidebarsByName).toBe(dummyActiveSidebars);
    });

    it(`returns an empty array, when there are no sidebars in the state`, (): void => {
      const sidebarsByName = getAllActiveSidebars(dummyEmptyState);
      expect(sidebarsByName).toEqual([]);
    });

  });

});
