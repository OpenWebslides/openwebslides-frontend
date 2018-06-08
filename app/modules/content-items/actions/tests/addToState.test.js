// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../actionTypes';
import { addToState } from '../../actions';
import { contentItemTypes, contextTypes } from '../../model';
import type { AncestorContext } from '../../model';

describe(`addToState`, (): void => {

  const dummyId = 'abcdefghij';
  const dummyPlainTextType = contentItemTypes.HEADING;
  const dummyContext: AncestorContext = {
    contextType: contextTypes.PARENT,
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
        context: dummyContext,
        propsForType: dummyPlainTextProps,
      },
    };
    const resultAction = addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      dummyPlainTextProps,
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the passed type is a plainText type and the passed props don't include all necessary plainText information`, (): void => {
    expect((): any => addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      {},
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the passed props contain invalid keys for the given contentItemType`, (): void => {
    expect((): any => addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      {
        ...dummyPlainTextProps,
        definitelyNotAValidProp: 'abcde',
      },
    )).toThrow(InvalidArgumentError);
  });

  it(`trims all passed plainText string props, when the passed string props contain unnecessary whitespace`, (): void => {
    const expectedAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyId,
        type: dummyPlainTextType,
        context: dummyContext,
        propsForType: dummyPlainTextProps,
      },
    };
    const resultAction = addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      {
        text: `   ${dummyPlainTextProps.text}   `,
      },
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`temporarily throws a NotYetImplementedError, when attempting to add a type other than plainText`, (): void => {
    expect((): any => addToState(
      dummyId,
      contentItemTypes.IMAGE,
      dummyContext,
      {},
    )).toThrow(NotYetImplementedError);
  });

});
