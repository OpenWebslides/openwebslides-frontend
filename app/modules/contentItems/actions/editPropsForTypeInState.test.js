// @flow

import { InvalidArgumentError, NotYetImplementedError, UnsupportedOperationError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import type { HeadingContentItem } from '../model';

import actions from '.';

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
    const expectedAction: a.EditPropsForTypeInStateAction = {
      type: a.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: dummyPlainTextProps,
      },
    };
    const actualAction = actions.editPropsForTypeInState(dummyContentItem, dummyPlainTextProps);
    expect(actualAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the passed props contain invalid keys for the given contentItemType`, (): void => {
    expect((): any => actions.editPropsForTypeInState(
      dummyContentItem,
      ({
        ...dummyPlainTextProps,
        definitelyNotAValidProp: 'abcde',
      }: any),
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an UnsupportedOperationError, when all passed props are undefined`, (): void => {
    expect((): any => actions.editPropsForTypeInState(
      dummyContentItem,
      {},
    )).toThrow(UnsupportedOperationError);
  });

  it(`trims all passed plainText string props, when the contentItem's isEditing value is FALSE and the passed string props contain unnecessary whitespace`, (): void => {
    const expectedAction: a.EditPropsForTypeInStateAction = {
      type: a.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: dummyPlainTextProps,
      },
    };
    const actualAction = actions.editPropsForTypeInState(
      dummyContentItem,
      {
        text: `   ${String(dummyPlainTextProps.text)}   `,
      },
    );
    expect(actualAction).toEqual(expectedAction);
  });

  it(`does not trim passed plainText string props, when the contentItem's isEditing value is TRUE and the passed string props contain unnecessary whitespace`, (): void => {
    dummyContentItem.isEditing = true;

    const expectedAction: a.EditPropsForTypeInStateAction = {
      type: a.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: {
          text: `   ${String(dummyPlainTextProps.text)}   `,
        },
      },
    };
    const actualAction = actions.editPropsForTypeInState(
      dummyContentItem,
      {
        text: `   ${String(dummyPlainTextProps.text)}   `,
      },
    );
    expect(actualAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the contentItem's isEditing value is FALSE and a non-nullable plainText string prop is an empty string`, (): void => {
    expect((): any => actions.editPropsForTypeInState(
      dummyContentItem,
      {
        text: '',
      },
    )).toThrow(InvalidArgumentError);
  });

  it(`does not throw any error, when the contentItem's isEditing value is TRUE and a non-nullable plainText string prop is an empty string`, (): void => {
    dummyContentItem.isEditing = true;

    const expectedAction: a.EditPropsForTypeInStateAction = {
      type: a.EDIT_PROPS_FOR_TYPE_IN_STATE,
      payload: {
        contentItem: dummyContentItem,
        propsForType: {
          text: '',
        },
      },
    };
    const actualAction = actions.editPropsForTypeInState(
      dummyContentItem,
      {
        text: '',
      },
    );
    expect(actualAction).toEqual(expectedAction);
  });

  it(`temporarily throws a NotYetImplementedError, when attempting to add a type other than plainText`, (): void => {
    expect((): any => actions.editPropsForTypeInState(
      dummyData.imageContentItem,
      {},
    )).toThrow(NotYetImplementedError);
  });

});
