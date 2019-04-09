// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`setCurrentlySelectedInState`, (): void => {

  let dummyId: ?string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a contentItem SET_CURRENTLY_SELECTED_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: a.SetCurrentlySelectedInStateAction = {
      type: a.SET_CURRENTLY_SELECTED_IN_STATE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.setCurrentlySelectedInState(dummyId);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
