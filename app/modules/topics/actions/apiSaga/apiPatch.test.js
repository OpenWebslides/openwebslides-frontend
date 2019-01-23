// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyAccess: m.AccessType;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
    dummyAccess = m.accessTypes.PUBLIC;
  });

  it(`returns a topics API_PATCH action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPatchAction = {
      type: a.API_PATCH,
      payload: {
        id: dummyId,
        title: dummyTitle,
        description: dummyDescription,
        access: dummyAccess,
      },
    };
    const actualAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription, dummyAccess);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
