// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`selectInState`, (): void => {

  let dummySelection: m.SelectionType;

  beforeEach((): void => {
    dummySelection = m.selectionTypes.NEXT;
  });

  it(`returns a contentItem SELECT_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: a.SelectInStateAction = {
      type: a.SELECT_IN_STATE,
      payload: {
        selection: dummySelection,
      },
    };
    const actualAction = actions.selectInState(dummySelection);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
