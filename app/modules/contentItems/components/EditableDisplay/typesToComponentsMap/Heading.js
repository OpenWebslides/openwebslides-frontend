// @flow

import _ from 'lodash';
import * as React from 'react';

import EditableTextContent from 'components/EditableTextContent';

import * as m from '../../../model';

import TypeBlockWrapper from './TypeBlockWrapper';

import { passThroughProps } from '..';

type PassedProps = {|
  contentItem: m.HeadingContentItem,
  isSelected: boolean,
  onEndEditing: (id: string) => void,
  onEditPlainText: (id: string, text: string) => void,
  onAddEmptySubItem: (id: string) => void,
  onRemove: (id: string) => void,
  onIndent: (id: string) => void,
  onReverseIndent: (id: string) => void,
|};

type Props = {| ...PassedProps |};

class PureHeading extends React.Component<Props> {
  onEditableTextContentSubmit = (text: string): void => {
    const { contentItem, onEditPlainText } = this.props;
    onEditPlainText(contentItem.id, text);
  };

  onEditableTextContentDeactivate = (addEmptyItem: boolean): void => {
    const { contentItem, onEndEditing, onAddEmptySubItem } = this.props;

    onEndEditing(contentItem.id);

    if (addEmptyItem) onAddEmptySubItem(contentItem.id);
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

  render = (): React.Node => {
    const { contentItem, isSelected } = this.props;

    return (
      <TypeBlockWrapper
        data-test-id="content-item-editable-display-heading"
        {..._.pick(this.props, passThroughProps)}
        contentItemId={contentItem.id}
        isSelected={isSelected}
        iconName="header"
      >
        <EditableTextContent
          contentItemId={contentItem.id}
          maxLength={100}
          initialText={contentItem.text}
          initialIsActive={contentItem.isEditing}
          onSubmit={this.onEditableTextContentSubmit}
          onDeactivate={this.onEditableTextContentDeactivate}
          onRemove={this.onEditableTextContentRemove}
          onIndent={this.onIndent}
          onUnindent={this.onUnindent}
        />
      </TypeBlockWrapper>
    );
  };
}

const Heading = PureHeading;

export { PureHeading };
export default Heading;
