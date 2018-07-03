// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import type { AllPropsForAllTypes } from '../model';

import actions from '.';

describe(`edit`, (): void => {

  let dummyId: Identifier;
  let dummyTextProps: $Shape<AllPropsForAllTypes>;

  beforeEach((): void => {
    dummyId = 'abcdefghij';
    dummyTextProps = {
      text: 'Lorem ipsum dolor sit amet.',
    };
  });

  it(`returns a contentItem EDIT action containing the passed props`, (): void => {
    const expectedAction: t.EditAction = {
      type: t.EDIT,
      payload: {
        id: dummyId,
        propsForType: dummyTextProps,
      },
    };
    const actualAction = actions.edit(dummyId, dummyTextProps);
    expect(actualAction).toEqual(expectedAction);
  });

});
