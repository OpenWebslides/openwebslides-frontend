// @flow

import * as a from '../actionTypes';
import { contentItemTypes, contextTypes } from '../model';
import type { ContentItemType, AllPropsForAllTypes, Context } from '../model';

import actions from '.';

describe(`add`, (): void => {

  let dummyType: ContentItemType;
  let dummyContext: Context;
  let dummyProps: $Shape<AllPropsForAllTypes>;

  beforeEach((): void => {
    dummyType = contentItemTypes.HEADING;
    dummyContext = {
      contextType: contextTypes.SIBLING,
      contextItemId: 'abcdefghijklmnopqrst',
    };
    dummyProps = {
      text: 'Lorem ipsum dolor sit amet.',
    };
  });

  it(`returns a contentItem ADD action containing the passed props`, (): void => {
    const expectedAction: a.AddAction = {
      type: a.ADD,
      payload: {
        type: dummyType,
        context: dummyContext,
        propsForType: dummyProps,
      },
    };
    const actualAction = actions.add(dummyType, dummyContext, dummyProps);
    expect(actualAction).toEqual(expectedAction);
  });

});
