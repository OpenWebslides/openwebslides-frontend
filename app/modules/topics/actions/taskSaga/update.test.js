// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
  });

  it(`returns a topics UPDATE action containing the passed arguments`, (): void => {
    const expectedAction: a.UpdateAction = {
      type: a.UPDATE,
      payload: {
        id: dummyId,
        title: dummyTitle,
        description: dummyDescription,
      },
    };
    const actualAction = actions.update(dummyId, dummyTitle, dummyDescription);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
