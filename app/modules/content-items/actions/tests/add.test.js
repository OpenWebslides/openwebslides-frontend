// @flow

import * as t from '../../actionTypes';
import { add } from '../../actions';
import { contentItemTypes } from '../../model';

describe(`add`, (): void => {

  const dummyType = contentItemTypes.HEADING;
  const dummyProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem ADD action containing the passed props`, (): void => {
    const expectedAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: dummyType,
        propsForType: dummyProps,
      },
    };
    expect(add(dummyType, dummyProps)).toEqual(expectedAction);
  });

});
