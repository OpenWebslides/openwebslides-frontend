// @flow

import * as t from '../../actionTypes';
import { edit } from '../../actions';
import { contentItemTypes } from '../../model';

describe(`edit`, (): void => {

  const dummyId = 'abcdefghij';
  const dummyType = contentItemTypes.HEADING;
  const dummyProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem EDIT action containing the passed props`, (): void => {
    const expectedAction: t.EditAction = {
      type: t.EDIT,
      payload: {
        id: dummyId,
        type: dummyType,
        props: dummyProps,
      },
    };
    expect(edit(dummyId, dummyType, dummyProps)).toEqual(expectedAction);
  });

});
