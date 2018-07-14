// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as t from '../actionTypes';
import type { ContentItem } from '../model';

import actions from '.';

describe(`setMultipleInState`, (): void => {

  let dummyContentItems: Array<ContentItem>;

  beforeEach((): void => {
    dummyContentItems = [
      { ...(dummyData.rootContentItem: any) },
      { ...(dummyData.headingContentItem: any) },
    ];
  });

  it(`returns a contentItem SET_MULTIPLE_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: t.SetMultipleInStateAction = {
      type: t.SET_MULTIPLE_IN_STATE,
      payload: {
        contentItems: dummyContentItems,
      },
    };
    const actualAction = actions.setMultipleInState(dummyContentItems);
    expect(actualAction).toEqual(expectedAction);
  });

});
