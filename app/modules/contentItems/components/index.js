// @flow

import EditableDisplay from './EditableDisplay';
import HtmlDisplay from './HtmlDisplay';
import MarkdownToolbar from './MarkdownToolbar';
import RootEditableDisplay from './RootEditableDisplay';

const components = {
  EditableDisplay,
  HtmlDisplay,
  MarkdownToolbar,
  RootEditableDisplay,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default components;
