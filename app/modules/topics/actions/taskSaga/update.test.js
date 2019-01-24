// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`update`, (): void => {

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

  it(`returns a topics UPDATE action containing the passed arguments`, (): void => {
    const expectedAction: a.UpdateAction = {
      type: a.UPDATE,
      payload: {
        id: dummyId,
        title: dummyTitle,
        description: dummyDescription,
        access: dummyAccess,
      },
    };
    const actualAction = actions.update(dummyId, dummyTitle, dummyDescription, dummyAccess);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
