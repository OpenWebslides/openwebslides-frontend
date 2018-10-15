// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`updateWithContent`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
  });

  it(`returns a topics UPDATE_WITH_CONTENT action containing the passed arguments`, (): void => {
    const expectedAction: a.UpdateWithContentAction = {
      type: a.UPDATE_WITH_CONTENT,
      payload: {
        id: dummyId,
        title: dummyTitle,
        description: dummyDescription,
      },
    };
    const actualAction = actions.updateWithContent(dummyId, dummyTitle, dummyDescription);

    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`defaults the title and description values to NULL, when no corresponding parameter is passed`, (): void => {
    const expectedAction: a.UpdateWithContentAction = {
      type: a.UPDATE_WITH_CONTENT,
      payload: {
        id: dummyId,
        title: null,
        description: null,
      },
    };
    const actualAction = actions.updateWithContent(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
