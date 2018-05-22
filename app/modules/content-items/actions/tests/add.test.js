// @flow

import * as t from '../../actionTypes';
import { add } from '../../actions';
import { contentItemTypes } from '../../model';

describe(`add`, (): void => {

  const dummyIsEditing = false;
  const dummyType = contentItemTypes.HEADING;
  const dummyProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem ADD action containing the passed props`, (): void => {
    const expectedAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: dummyType,
        isEditing: dummyIsEditing,
        propsForType: dummyProps,
      },
    };
    expect(add(dummyType, dummyProps, dummyIsEditing)).toEqual(expectedAction);
  });

  it(`returns an action with isEditing set to FALSE, if the isEditing argument isn't passed`, (): void => {
    const expectedAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: dummyType,
        isEditing: false,
        propsForType: dummyProps,
      },
    };
    expect(add(dummyType, dummyProps)).toEqual(expectedAction);
  });

});
