// @flow

// import { contentItemTypes } from 'modules/content-items';
import { dummySlideStylingById } from '../dummyData';

import reducer from '../reducer';
// import * as t from '../actionTypes';
import type { SlideStylingState } from '../model';

describe('reducer', (): void => {
  describe('initial', (): void => {
    const dummyInitialState: SlideStylingState = {
      byId: dummySlideStylingById,
    };

    it('returns the initial state, when state parameter is undefined', (): void => {
      const dummyAction: any = {
        type: 'DUMMY_ACTION',
      };

      expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
    });
  });

  /* describe('EDIT_CONTENTTYPE_COLOR_IN_STATE', (): void => {
    const dummySlideStyling: $Exact<SlideStyling> = {
      id: 'abcdefghij',
      userId: 'asdfrqSfgd',
      rules: {
        [contentItemTypes.HEADING]: {
          color: '#000000',
        },
      },
    };

    it('changes the color of a contentItemType, when the passed color is valid', (): void => {
      const editedColor = '#134678';
    });
  }); */
});
