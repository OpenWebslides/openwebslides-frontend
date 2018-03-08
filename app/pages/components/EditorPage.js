// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import contentItems from 'modules/content-items';

type Props = TranslatorProps & { /* new props go here */ };

const ContentItemsEditor = contentItems.components.Editor;

const EditorPage = (props: Props): React.Node => {
  return (
    <div>
      <ContentItemsEditor />
    </div>
  );
};

export { EditorPage as PureEditorPage };
export default translate()(EditorPage);
