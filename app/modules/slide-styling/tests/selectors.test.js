// @flow

import { contentItemTypes } from 'modules/content-items';
import type { SlideStyling, SlideStylingById, SlideStylingState } from '../model';
import { getAll, getAllById, getById } from '../selectors';

describe('selectors', (): void => {

  const dummySlideStyling: $Exact<SlideStyling> = {
    id: 'abcdefghij',
    userId: 'efghijklmn',
    rules: {
      [contentItemTypes.HEADING]: {
        color: '#123785',
      },
    },
  };
  const dummySlideStylingById: SlideStylingById = {
    [dummySlideStyling.id]: dummySlideStyling,
  };
  const dummySlideStylingState: SlideStylingState = {
    byId: dummySlideStylingById,
  };
  const dummyState: any = {
    modules: {
      slideStyling: dummySlideStylingState,
    },
  };
  const dummyEmptyState: any = {
    modules: {
      slideStyling: {
        byId: {},
      },
    },
  };

  describe('getById', (): void => {
    it('returns the correct slideStyling for the given id, when the id is valid', (): void => {
      const slideStyling = getById(dummyState, { id: dummySlideStyling.id });
      expect(slideStyling).toBe(dummySlideStyling);
    });

    it('returns NULL, when the given id is invalid', (): void => {
      const slideStyling = getById(dummyState, { id: 'xyzabcdefg' });
      expect(slideStyling).toBeNull();
    });

  });

  describe('getAllById', (): void => {
    it('returns an object mapping all slideStyling ids to their slideStyling, when there are one or more slideStylings in the state', (): void => {
      const slideStylingsById = getAllById(dummyState);
      expect(slideStylingsById).toBe(dummySlideStylingById);
    });

    it('returns an empty object, when there are no slideStylings in the state', (): void => {
      const slideStylingsById = getAllById(dummyEmptyState);
      expect(slideStylingsById).toEqual({});
    });
  });

  describe('getAll', (): void => {
    it('returns an array containing all slideStylings, when tere are one or more slideStylings in the state', (): void => {
      const slideStylings = getAll(dummyState);
      expect(slideStylings).toEqual([dummySlideStyling]);
    });
  });
  it('returns an empty array, when there are no slideStylings in the state', (): void => {
    const slideStylings = getAll(dummyEmptyState);
    expect(slideStylings).toEqual([]);
  });

});
