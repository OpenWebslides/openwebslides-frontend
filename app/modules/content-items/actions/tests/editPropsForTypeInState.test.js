// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';

import * as t from '../../actionTypes';
import { editPropsForTypeInState } from '../../actions';
import { contentItemTypes } from '../../model';

describe(`editPropsForTypeInState`, (): void => {

  const dummyId = 'abcdefghij';
  const dummyPlainTextType = contentItemTypes.HEADING;
  const dummyIsEditing = false;
  const dummyPlainTextProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem EDIT_PROPS_FOR_TYPE_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        isEditing: dummyIsEditing,
        propsForType: dummyPlainTextProps,
      },
    };
    expect(editPropsForTypeInState(dummyId, dummyPlainTextType, dummyPlainTextProps, dummyIsEditing)).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the passed props contain invalid keys for the given contentItemType`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyId,
      dummyPlainTextType,
      {
        ...dummyPlainTextProps,
        definitelyNotAValidProp: 'abcde',
      },
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an UnsupportedOperationError, when all passed props are undefined`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyId,
      dummyPlainTextType,
      {},
    )).toThrow(UnsupportedOperationError);
  });

  it(`trims all passed plainText string props, when isEditing is FALSE and the passed string props contain unnecessary whitespace`, (): void => {
    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        isEditing: false,
        propsForType: dummyPlainTextProps,
      },
    };
    const resultAction = editPropsForTypeInState(
      dummyId,
      dummyPlainTextType,
      {
        text: `   ${dummyPlainTextProps.text}   `,
      },
      false,
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`does not trim passed plainText string props, when isEditing is TRUE and the passed string props contain unnecessary whitespace`, (): void => {
    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        isEditing: true,
        propsForType: {
          text: `   ${dummyPlainTextProps.text}   `,
        },
      },
    };
    const resultAction = editPropsForTypeInState(
      dummyId,
      dummyPlainTextType,
      {
        text: `   ${dummyPlainTextProps.text}   `,
      },
      true,
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when isEditing is FALSE and a non-nullable plainText string prop is an empty string`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyId,
      dummyPlainTextType,
      {
        text: '',
      },
      false,
    )).toThrow(InvalidArgumentError);
  });

  it(`does not throw any error, when isEditing is TRUE and a non-nullable plainText string prop is an empty string`, (): void => {
    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        isEditing: true,
        propsForType: {
          text: '',
        },
      },
    };
    const resultAction = editPropsForTypeInState(
      dummyId,
      dummyPlainTextType,
      {
        text: '',
      },
      true,
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`temporarily throws a NotYetImplementedError, when attempting to add a type other than plainText`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyId,
      contentItemTypes.IMAGE,
      {},
    )).toThrow(NotYetImplementedError);
  });

});
