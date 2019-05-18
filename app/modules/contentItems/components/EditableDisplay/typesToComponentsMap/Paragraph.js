// @flow

import _ from 'lodash';
import * as React from 'react';

import * as m from '../../../model';

import TypeBlockWrapper from './TypeBlockWrapper';

import EditableTextContent from '../EditableTextContent';

import InlineMarkdown from 'components/InlineMarkdown';

import { passThroughProps } from '..';

type PassedProps = {|
  contentItem: m.ParagraphContentItem,
  isSelected: boolean,
  onActivate: () => void,
  onDeactivate: () => void,
  onEndEditing: (id: string) => void,
  onEditPlainText: (id: string, text: string) => void,
  onAddEmptySiblingItemBelow: (id: string) => void,
  onRemove: (id: string) => void,
  onIndent: (id: string) => void,
  onReverseIndent: (id: string) => void,
  isActive: boolean,
|};

type Props = {| ...PassedProps |};

class PureParagraph extends React.Component<Props> {
  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    const { onActivate } = this.props;

    // Only activate if left mouse button was clicked
    if (event.button === 0) onActivate();
  };

  onEditableTextContentSubmit = (text: string): void => {
    const { contentItem, onEditPlainText } = this.props;
    onEditPlainText(contentItem.id, text);
  };

  onEditableTextContentDeactivate = (addEmptyItem: boolean): void => {
    const { contentItem, onDeactivate, onEndEditing, onAddEmptySiblingItemBelow } = this.props;

    onDeactivate();
    onEndEditing(contentItem.id);

    if (addEmptyItem) onAddEmptySiblingItemBelow(contentItem.id);
  };

  onEditableTextContentRemove = (): void => {
    const { contentItem, onRemove } = this.props;
    onRemove(contentItem.id);
  };

  onIndent = (): void => {
    const { contentItem, onIndent } = this.props;
    onIndent(contentItem.id);
  };

  onUnindent = (): void => {
    const { contentItem, onReverseIndent } = this.props;
    onReverseIndent(contentItem.id);
  };

  renderAsInput(): React.Node {
    const { contentItem } = this.props;

    return (
      <div
        data-test-id="content-item-editable-display__input"
      >
        <EditableTextContent
          contentItem={contentItem}
          multiline={true}
          initialText={contentItem.text}
          onSubmit={this.onEditableTextContentSubmit}
          onDeactivate={this.onEditableTextContentDeactivate}
          onRemove={this.onEditableTextContentRemove}
          onIndent={this.onIndent}
          onUnindent={this.onUnindent}
        />
      </div>
    );
  }

  renderAsText(): React.Node {
    const { contentItem } = this.props;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div
        className="content-item-editable-display-paragraph__text"
        data-test-id="content-item-editable-display-paragraph__text"
        role="link"
        tabIndex={-1}
        onClick={this.handleClick}
      >
        <InlineMarkdown text={contentItem.text} />
      </div>
    );
    /* eslint-enable */
  }

  render = (): React.Node => {
    const { contentItem, isSelected, isActive } = this.props;

    return (
      <TypeBlockWrapper
        data-test-id="content-item-editable-display-paragraph"
        {..._.pick(this.props, passThroughProps)}
        contentItemId={contentItem.id}
        isSelected={isSelected}
        iconName="paragraph"
      >
        {(isActive) ? this.renderAsInput() : this.renderAsText()}
      </TypeBlockWrapper>
    );
  };
}

const Paragraph = PureParagraph;

export { PureParagraph };
export default Paragraph;
