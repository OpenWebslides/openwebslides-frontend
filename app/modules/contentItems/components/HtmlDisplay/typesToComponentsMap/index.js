// @flow

import * as React from 'react';

import * as m from '../../../model';

import Root from './Root';
import Heading from './Heading';
import Paragraph from './Paragraph';

const DummyDisplayComponent = (): React.Node => (
  <p>Not implemented yet.</p>
);

const typesToComponentsMap = {
  [m.contentItemTypes.ROOT]: Root,
  [m.contentItemTypes.HEADING]: Heading,
  [m.contentItemTypes.PARAGRAPH]: Paragraph,
  [m.contentItemTypes.LIST]: DummyDisplayComponent,
  [m.contentItemTypes.LIST_ITEM]: DummyDisplayComponent,
  [m.contentItemTypes.BLOCKQUOTE]: DummyDisplayComponent,
  [m.contentItemTypes.CODE]: DummyDisplayComponent,
  [m.contentItemTypes.IMAGE]: DummyDisplayComponent,
  [m.contentItemTypes.VIDEO]: DummyDisplayComponent,
  [m.contentItemTypes.AUDIO]: DummyDisplayComponent,
  [m.contentItemTypes.IFRAME]: DummyDisplayComponent,
  [m.contentItemTypes.SLIDE_BREAK]: DummyDisplayComponent,
  [m.contentItemTypes.COURSE_BREAK]: DummyDisplayComponent,
};

export { DummyDisplayComponent };
export default typesToComponentsMap;
