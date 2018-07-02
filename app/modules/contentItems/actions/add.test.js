// @flow

import * as t from '../actionTypes';
import { add } from '../actions';
import { contentItemTypes, contextTypes } from '../model';
import type { Context } from '../model';

describe(`add`, (): void => {

  const dummyType = contentItemTypes.HEADING;
  const dummyContext: Context = {
    contextType: contextTypes.SIBLING,
    contextItemId: 'abcdefghijklmnopqrst',
  };
  const dummyProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem ADD action containing the passed props`, (): void => {
    const expectedAction: t.AddAction = {
      type: t.ADD,
      payload: {
        type: dummyType,
        context: dummyContext,
        propsForType: dummyProps,
      },
    };
    expect(add(dummyType, dummyContext, dummyProps)).toEqual(expectedAction);
  });

});
