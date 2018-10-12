// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`edit`, (): void => {

  let dummyId: string;
  let dummyEditedProps: $PropertyType<$PropertyType<a.EditAction, 'payload'>, 'editedProps'>;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyEditedProps = {
      title: 'dummyTitle',
      description: null,
    };
  });

  it(`returns a topics EDIT action containing the passed arguments`, (): void => {
    const expectedAction: a.EditAction = {
      type: a.EDIT,
      payload: {
        id: dummyId,
        editedProps: dummyEditedProps,
      },
    };
    const actualAction = actions.edit(dummyId, dummyEditedProps);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
