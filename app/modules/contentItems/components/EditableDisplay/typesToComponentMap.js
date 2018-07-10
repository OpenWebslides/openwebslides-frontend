// @flow

import * as React from 'react';

import * as model from '../../model';

import Root from './types/Root';
import Heading from './types/Heading';
import Paragraph from './types/Paragraph';

const { contentItemTypes } = model;

const DummyDisplayComponent = (): React.Node => (
  <p>Not implemented yet.</p>
);

const typesToComponentMap = {
  [contentItemTypes.ROOT]: Root,
  [contentItemTypes.HEADING]: Heading,
  [contentItemTypes.PARAGRAPH]: Paragraph,
  [contentItemTypes.LIST]: DummyDisplayComponent,
  [contentItemTypes.LIST_ITEM]: DummyDisplayComponent,
  [contentItemTypes.BLOCKQUOTE]: DummyDisplayComponent,
  [contentItemTypes.CODE]: DummyDisplayComponent,
  [contentItemTypes.IMAGE]: DummyDisplayComponent,
  [contentItemTypes.VIDEO]: DummyDisplayComponent,
  [contentItemTypes.AUDIO]: DummyDisplayComponent,
  [contentItemTypes.IFRAME]: DummyDisplayComponent,
  [contentItemTypes.SLIDE_BREAK]: DummyDisplayComponent,
  [contentItemTypes.COURSE_BREAK]: DummyDisplayComponent,
};

export { DummyDisplayComponent };
export default typesToComponentMap;
