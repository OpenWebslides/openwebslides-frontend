// @flow

import * as t from '../../actionTypes';
import { edit } from '../../actions';

describe(`edit`, (): void => {

  const dummyId = 'abcdefghij';
  const dummyIsEditing = false;
  const dummyTextProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem EDIT action containing the passed props`, (): void => {
    const expectedAction: t.EditAction = {
      type: t.EDIT,
      payload: {
        id: dummyId,
        isEditing: dummyIsEditing,
        propsForType: dummyTextProps,
      },
    };
    expect(edit(dummyId, dummyTextProps, dummyIsEditing)).toEqual(expectedAction);
  });

  it(`returns an action with isEditing set to FALSE, if the isEditing argument isn't passed`, (): void => {
    const expectedAction: t.EditAction = {
      type: t.EDIT,
      payload: {
        id: dummyId,
        isEditing: false,
        propsForType: dummyTextProps,
      },
    };
    expect(edit(dummyId, dummyTextProps)).toEqual(expectedAction);
  });

});
