// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`update`, (): void => {

  let dummyId: string;
  let dummyUpdatedProps: $PropertyType<$PropertyType<a.UpdateAction, 'payload'>, 'updatedProps'>;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyUpdatedProps = {
      title: 'dummyTitle',
      description: null,
    };
  });

  it(`returns a topics UPDATE action containing the passed arguments`, (): void => {
    const expectedAction: a.UpdateAction = {
      type: a.UPDATE,
      payload: {
        id: dummyId,
        updatedProps: dummyUpdatedProps,
      },
    };
    const actualAction = actions.update(dummyId, dummyUpdatedProps);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
