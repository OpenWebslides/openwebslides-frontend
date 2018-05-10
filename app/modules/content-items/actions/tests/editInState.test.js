// @flow

import * as t from '../../actionTypes';
import { editInState } from '../../actions';
import { contentItemTypes } from '../../model';

describe(`editInState`, (): void => {

  const dummyId = 'abcdefghij';
  const dummyPlainTextType = contentItemTypes.HEADING;
  const dummyPlainTextProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem EDIT_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        props: dummyPlainTextProps,
      },
    };
    expect(editInState(dummyId, dummyPlainTextType, dummyPlainTextProps)).toEqual(expectedAction);
  });

  it(`throws an error, when the passed props contain invalid keys for the given contentItemType`, (): void => {
    expect((): any => editInState(
      dummyId,
      dummyPlainTextType,
      {
        ...dummyPlainTextProps,
        definitelyNotAValidProp: 'abcde',
      },
    )).toThrowError();
  });

  it(`throws an error, when all passed props are undefined`, (): void => {
    expect((): any => editInState(
      dummyId,
      dummyPlainTextType,
      {},
    )).toThrowError();
  });

  it(`trims all passed plainText string props, when the passed string props contain unnecessary whitespace`, (): void => {
    const expectedAction: t.EditInStateAction = {
      type: t.EDIT_IN_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        props: dummyPlainTextProps,
      },
    };
    expect(editInState(
      dummyId,
      dummyPlainTextType,
      {
        text: `   ${dummyPlainTextProps.text}   `,
      },
    )).toEqual(expectedAction);
  });

  it(`throws an error, when a non-nullable plainText string prop is an empty string`, (): void => {
    expect((): any => editInState(
      dummyId,
      dummyPlainTextType,
      {
        text: '   ',
      },
    )).toThrowError();
  });

});
