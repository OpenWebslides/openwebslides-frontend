// @flow

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../model';

import lib from '..';

describe(`isEmpty`, (): void => {

  let dummyPlainTextContentItem: m.ParagraphContentItem;
  let dummyNonPlainTextContentItem: m.ImageContentItem;

  beforeEach((): void => {
    dummyPlainTextContentItem = { ...dummyData.paragraphContentItem };
    dummyNonPlainTextContentItem = { ...dummyData.imageContentItem };
  });

  it(`returns TRUE, when the contentItem is a plaintext contentItem and its 'text' property is an empty string`, (): void => {
    dummyPlainTextContentItem.text = '';
    expect(lib.isEmpty(dummyPlainTextContentItem)).toBe(true);
  });

  it(`returns FALSE, when the contentItem is a plaintext contentItem and its 'text' property is a non-empty string`, (): void => {
    expect(lib.isEmpty(dummyPlainTextContentItem)).toBe(false);
  });

  it(`temporarily always returns FALSE, when the contentItem is not a plaintext contentItem`, (): void => {
    expect(lib.isEmpty(dummyNonPlainTextContentItem)).toBe(false);
  });

});
