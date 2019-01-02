// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`add`, (): void => {

  let dummyType: m.ContentItemType;
  let dummyContext: m.ContentItemContext;
  let dummyProps: $Shape<m.AllPropsForAllTypes>;

  beforeEach((): void => {
    dummyType = m.contentItemTypes.HEADING;
    dummyContext = {
      contextType: m.contextTypes.SIBLING,
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
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
