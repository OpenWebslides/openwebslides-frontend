// @flow

import { InvalidArgumentError, NotYetImplementedError } from 'errors';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`addToState`, (): void => {

  let dummyId: string;
  let dummyPlainTextType: m.ContentItemType;
  let dummyContext: m.VerticalContext;
  let dummyPlainTextProps: $Shape<m.AllPropsForAllTypes>;

  beforeEach((): void => {
    dummyId = 'abcdefghij';
    dummyPlainTextType = m.contentItemTypes.HEADING;
    dummyContext = {
      contextType: m.contextTypes.PARENT,
      contextItemId: 'uvwxyzabcdefghijklmn',
    };
    dummyPlainTextProps = {
      text: 'Lorem ipsum dolor sit amet.',
    };
  });

  it(`returns a contentItem ADD_TO_STATE action containing the passed props`, (): void => {
    const expectedAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
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
    const expectedAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
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
      m.contentItemTypes.IMAGE,
      dummyContext,
      {},
    )).toThrow(NotYetImplementedError);
  });

});
