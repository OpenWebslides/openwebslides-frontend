// @flow

import selectors from '.';

describe(`getCurrentlySelectedId`, (): void => {

  let dummyId: string;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyState = {
      modules: {
        contentItems: {
          currentlySelectedId: dummyId,
        },
      },
    };
    dummyEmptyState = {
      modules: {
        contentItems: {
          currentlySelectedId: null,
        },
      },
    };
  });

  it(`returns the currently selected id, if there is one`, (): void => {
    const currentlySelectedId = selectors.getCurrentlySelectedId(dummyState);
    expect(currentlySelectedId).toBe(dummyId);
  });

  it(`returns NULL, when there is no selected id`, (): void => {
    const currentlySelectedId = selectors.getCurrentlySelectedId(dummyEmptyState);
    expect(currentlySelectedId).toBeNull();
  });

});
