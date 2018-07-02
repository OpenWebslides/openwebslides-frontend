// @flow

import * as t from '../actionTypes';
import { edit } from '../actions';

describe(`edit`, (): void => {

  const dummyId = 'abcdefghij';
  const dummyTextProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem EDIT action containing the passed props`, (): void => {
    const expectedAction: t.EditAction = {
      type: t.EDIT,
      payload: {
        id: dummyId,
        propsForType: dummyTextProps,
      },
    };
    expect(edit(dummyId, dummyTextProps)).toEqual(expectedAction);
  });

});
