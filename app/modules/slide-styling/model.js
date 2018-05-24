// @flow

import type { Identifier } from 'types/model';
import type { ContentItemType } from 'modules/content-items';
import generateRandomString from 'lib/generate-random-string';

const ID_LENGTH = 20;

export type SlideStylingProperties = {
  +color: string,
  +font: string,
};

export type SlideStylingRules = {
  +[ContentItemType]: SlideStylingProperties,
};

export type SlideStyling = {
  +id: Identifier,
  +userId: Identifier,
  +rules: SlideStylingRules,
};


export type SlideStylingById = {
  +[slideStylingId: Identifier]: SlideStyling,
};

export type SlideStylingState = {
  +byId: SlideStylingById,
};

export const generateId = (): Identifier => {
  return generateRandomString(ID_LENGTH);
};
