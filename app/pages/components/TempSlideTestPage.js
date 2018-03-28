// @flow

'no babel-plugin-flow-react-proptypes';

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import * as contentItems from 'modules/content-items';
import Slide from 'core-components/slides/Slide';

import Page from '../Page';

type Props = TranslatorProps;

const PureTempSlideTestPage = (props: Props): React.Node => {
  const dummyContentItemTreeRootItem = {
    id: 'abcdefghij',
    type: contentItems.contentItemTypes.ROOT,
    childItemIds: [],
    childItems: [],
  };

  return (
    <Page>
      <Slide contentItemTreeRootItem={dummyContentItemTreeRootItem} />
    </Page>
  );
};

const TempSlideTestPage = translate()(PureTempSlideTestPage);

export { PureTempSlideTestPage };
export default TempSlideTestPage;
