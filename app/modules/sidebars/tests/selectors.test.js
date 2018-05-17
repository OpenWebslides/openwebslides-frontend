// @flow

import { getAllByName } from '../selectors';
import type { SidebarsByName, SidebarsState } from '../model';

describe(`selectors`, (): void => {

  const dummySidebarName1: string = 'SidebarName/SLIDE';
  const dummySidebarName2: string = 'SidebarName/INFO';

  const dummySidebarsByName: SidebarsByName = [dummySidebarName1, dummySidebarName2];
  const dummySidebarsState: SidebarsState = {
    byName: dummySidebarsByName,
  };
  const dummyState: any = {
    modules: {
      sidebars: dummySidebarsState,
    },
  };
  const dummyEmptyState: any = {
    modules: {
      sidebars: {
        byName: [],
      },
    },
  };

  describe(`getAllByName`, (): void => {

    it(`returns an array of all Sidebars, when there are one or more sidebars in the state`, (): void => {
      const sidebarsByName = getAllByName(dummyState);
      expect(sidebarsByName).toBe(dummySidebarsByName);
    });

    it(`returns an empty array, when there are no sidebars in the state`, (): void => {
      const sidebarsByName = getAllByName(dummyEmptyState);
      expect(sidebarsByName).toEqual([]);
    });

  });

});
