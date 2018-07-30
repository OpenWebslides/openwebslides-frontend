// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`edit`, (): void => {

  let dummyId: string;
  let dummyTextProps: $Shape<m.AllPropsForAllTypes>;

  beforeEach((): void => {
    dummyId = 'abcdefghij';
    dummyTextProps = {
      text: 'Lorem ipsum dolor sit amet.',
    };
  });

  it(`returns a contentItem EDIT action containing the passed props`, (): void => {
    const expectedAction: a.EditAction = {
      type: a.EDIT,
      payload: {
        id: dummyId,
        propsForType: dummyTextProps,
      },
    };
    const actualAction = actions.edit(dummyId, dummyTextProps);
    expect(actualAction).toEqual(expectedAction);
  });

});
