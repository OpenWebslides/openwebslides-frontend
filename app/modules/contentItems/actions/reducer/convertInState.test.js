// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`convertInState`, (): void => {

  let dummyId: string;
  let dummyNewType: m.ContentItemType;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyNewType = m.contentItemTypes.HEADING;
  });

  it(`returns a contentItems CONVERT_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.ConvertInStateAction = {
      type: a.CONVERT_IN_STATE,
      payload: {
        id: dummyId,
        newType: dummyNewType,
      },
    };
    const actualAction = actions.convertInState(dummyId, dummyNewType);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
