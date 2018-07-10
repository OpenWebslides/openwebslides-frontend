// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import { contentItemTypes, contextTypes } from '../model';
import type { ContentItemType, AllPropsForAllTypes, VerticalContext } from '../model';

import actions from '.';

describe(`addToState`, (): void => {

  let dummyId: Identifier;
  let dummyPlainTextType: ContentItemType;
  let dummyContext: VerticalContext;
  let dummyPlainTextProps: $Shape<AllPropsForAllTypes>;

  beforeEach((): void => {
    dummyId = 'abcdefghij';
    dummyPlainTextType = contentItemTypes.HEADING;
    dummyContext = {
      contextType: contextTypes.PARENT,
      contextItemId: 'uvwxyzabcdefghijklmn',
    };
    dummyPlainTextProps = {
      text: 'Lorem ipsum dolor sit amet.',
    };
  });

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
    const actualAction = actions.addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      dummyPlainTextProps,
    );
    expect(actualAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the passed type is a plainText type and the passed props don't include all necessary plainText information`, (): void => {
    expect((): any => actions.addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      {},
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when the passed props contain invalid keys for the given contentItemType`, (): void => {
    expect((): any => actions.addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      ({
        ...dummyPlainTextProps,
        definitelyNotAValidProp: 'abcde',
      }: any),
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
    const actualAction = actions.addToState(
      dummyId,
      dummyPlainTextType,
      dummyContext,
      {
        text: `   ${dummyPlainTextProps.text}   `,
      },
    );
    expect(actualAction).toEqual(expectedAction);
  });

  it(`temporarily throws a NotYetImplementedError, when attempting to add a type other than plainText`, (): void => {
    expect((): any => actions.addToState(
      dummyId,
      contentItemTypes.IMAGE,
      dummyContext,
      {},
    )).toThrow(NotYetImplementedError);
  });

});
