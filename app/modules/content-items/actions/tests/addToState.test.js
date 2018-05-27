// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../actionTypes';
import { addToState } from '../../actions';
import { contentItemTypes } from '../../model';

describe(`addToState`, (): void => {

  const dummyId = 'abcdefghij';
  const dummyPlainTextType = contentItemTypes.HEADING;
  const dummyIsEditing = false;
  const dummyContext: t.ActionPayloadReducerContext = {
    contextType: t.actionPayloadReducerContextTypes.PARENT,
    contextItemId: 'uvwxyzabcdefghijklmn',
  };
  const dummyPlainTextProps = {
    text: 'Lorem ipsum dolor sit amet.',
  };

  it(`returns a contentItem ADD_TO_STATE action containing the passed props`, (): void => {
    const expectedAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        isEditing: dummyIsEditing,
        context: dummyContext,
        propsForType: dummyPlainTextProps,
      },
    };
    const resultAction = addToState(
      dummyId,
      dummyPlainTextType,
      dummyPlainTextProps,
      dummyContext,
      dummyIsEditing,
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the passed type is a plainText type and the passed props don't include all necessary plainText information`, (): void => {
    expect((): any => addToState(
      dummyId,
      dummyPlainTextType,
      {},
      dummyContext,
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the passed props contain invalid keys for the given contentItemType`, (): void => {
    expect((): any => addToState(
      dummyId,
      dummyPlainTextType,
      {
        ...dummyPlainTextProps,
        definitelyNotAValidProp: 'abcde',
      },
      dummyContext,
    )).toThrow(InvalidArgumentError);
  });

  it(`trims all passed plainText string props, when the passed string props contain unnecessary whitespace`, (): void => {
    const expectedAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        isEditing: dummyIsEditing,
        context: dummyContext,
        propsForType: dummyPlainTextProps,
      },
    };
    const resultAction = addToState(
      dummyId,
      dummyPlainTextType,
      {
        text: `   ${dummyPlainTextProps.text}   `,
      },
      dummyContext,
      dummyIsEditing,
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when isEditing is FALSE and a non-nullable plainText string prop is an empty string`, (): void => {
    expect((): any => addToState(
      dummyId,
      dummyPlainTextType,
      {
        text: '   ',
      },
      dummyContext,
      false,
    )).toThrow(InvalidArgumentError);
  });

  it(`does not throw any error, when isEditing is TRUE and a non-nullable plainText string prop is an empty string`, (): void => {
    const expectedAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        isEditing: true,
        context: dummyContext,
        propsForType: {
          text: '',
        },
      },
    };
    const resultAction = addToState(
      dummyId,
      dummyPlainTextType,
      {
        text: '',
      },
      dummyContext,
      true,
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`temporarily throws a NotYetImplementedError, when attempting to add a type other than plainText`, (): void => {
    expect((): any => addToState(
      dummyId,
      contentItemTypes.IMAGE,
      {},
      dummyContext,
    )).toThrow(NotYetImplementedError);
  });

});
