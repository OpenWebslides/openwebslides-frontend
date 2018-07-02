// @flow

import * as t from '../../actionTypes';
import { setMultipleInState } from '..';
import { contentItemTypes } from '../../model';
import type { ContentItem } from '../../model';

describe(`setMultipleInState`, (): void => {
  const dummyContentItem1: ContentItem = {
    id: 'w4lg2u0p1h',
    type: contentItemTypes.ROOT,
    isEditing: false,
    childItemIds: ['qflasjgtxr'],
  };

  const dummyContentItem2: ContentItem = {
    id: 'qflasjgtxr',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItemIds: [],
  };

  it(`returns a contentItem SET_MULTIPLE_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: t.SetMultipleInStateAction = {
      type: t.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: [
          dummyContentItem1,
          dummyContentItem2,
        ],
      },
    };
    expect(setMultipleInState([dummyContentItem1, dummyContentItem2])).toEqual(expectedAction);
  });
});
