// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';

import * as t from '../actionTypes';
import { editPropsForTypeInState } from '../actions';
import type { HeadingContentItem } from '../model';
import * as dummyData from '../lib/testResources/dummyContentItemData';

describe(`editPropsForTypeInState`, (): void => {

  let dummyContentItem: HeadingContentItem;
  let dummyPlainTextProps: { text: string };

  beforeEach((): void => {
    dummyContentItem = {
      ...dummyData.headingContentItem,
      isEditing: false,
    };
    dummyPlainTextProps = {
      text: 'This text has been edited.',
    };
  });

  it(`returns a contentItem EDIT_PROPS_FOR_TYPE_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: dummyPlainTextProps,
      },
    };
    expect(editPropsForTypeInState(dummyContentItem, dummyPlainTextProps)).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the passed props contain invalid keys for the given contentItemType`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyContentItem,
      ({
        ...dummyPlainTextProps,
        definitelyNotAValidProp: 'abcde',
      }: any),
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an UnsupportedOperationError, when all passed props are undefined`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyContentItem,
      {},
    )).toThrow(UnsupportedOperationError);
  });

  it(`trims all passed plainText string props, when the contentItem's isEditing value is FALSE and the passed string props contain unnecessary whitespace`, (): void => {
    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: dummyPlainTextProps,
      },
    };
    const resultAction = editPropsForTypeInState(
      dummyContentItem,
      {
        text: `   ${String(dummyPlainTextProps.text)}   `,
      },
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`does not trim passed plainText string props, when the contentItem's isEditing value is TRUE and the passed string props contain unnecessary whitespace`, (): void => {
    dummyContentItem.isEditing = true;

    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: {
          text: `   ${String(dummyPlainTextProps.text)}   `,
        },
      },
    };
    const resultAction = editPropsForTypeInState(
      dummyContentItem,
      {
        text: `   ${String(dummyPlainTextProps.text)}   `,
      },
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the contentItem's isEditing value is FALSE and a non-nullable plainText string prop is an empty string`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyContentItem,
      {
        text: '',
      },
    )).toThrow(InvalidArgumentError);
  });

  it(`does not throw any error, when the contentItem's isEditing value is TRUE and a non-nullable plainText string prop is an empty string`, (): void => {
    dummyContentItem.isEditing = true;

    const expectedAction: t.EditPropsForTypeInStateAction = {
      type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: {
          text: '',
        },
      },
    };
    const resultAction = editPropsForTypeInState(
      dummyContentItem,
      {
        text: '',
      },
    );
    expect(resultAction).toEqual(expectedAction);
  });

  it(`temporarily throws a NotYetImplementedError, when attempting to add a type other than plainText`, (): void => {
    expect((): any => editPropsForTypeInState(
      dummyData.imageContentItem,
      {},
    )).toThrow(NotYetImplementedError);
  });

});
