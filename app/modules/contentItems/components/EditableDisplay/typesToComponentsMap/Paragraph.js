// @flow

import _ from 'lodash';
import * as React from 'react';

import EditableTextContent from 'components/EditableTextContent';

import * as m from '../../../model';

import TypeBlockWrapper from './helpers/TypeBlockWrapper';

import { passThroughProps } from '..';

type PassedProps = {
  contentItem: m.ParagraphContentItem,
  onStartEditing: (id: string) => void,
  onEndEditing: (id: string) => void,
  onEditPlainText: (id: string, text: string) => void,
  onAddEmptySiblingItemBelow: (id: string) => void,
  onRemove: (id: string) => void,
  onIndent: (id: string) => void,
  onReverseIndent: (id: string) => void,
};

type Props = PassedProps;

class PureParagraph extends React.Component<Props> {
  onEditableTextContentActivate = (): void => {
    const { contentItem, onStartEditing } = this.props;
    onStartEditing(contentItem.id);
  };

  onEditableTextContentDeactivate = (): void => {
    const { contentItem, onEndEditing } = this.props;
    onEndEditing(contentItem.id);
  };

  onEditableTextContentInput = (text: string): void => {
    const { contentItem, onEditPlainText } = this.props;
    onEditPlainText(contentItem.id, text);
  };

  onEditableTextContentKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const {
      contentItem,
      onAddEmptySiblingItemBelow,
      onRemove,
      onIndent,
      onReverseIndent,
    } = this.props;

    if (event.key === 'Enter') {
      event.preventDefault();
      onAddEmptySiblingItemBelow(contentItem.id);
    }
    else if (event.key === 'Backspace' && contentItem.text === '') {
      event.preventDefault();
      onRemove(contentItem.id);
    }
    else if (event.key === 'ArrowRight' && event.ctrlKey === true) {
      event.preventDefault();
      onIndent(contentItem.id);
    }
    else if (event.key === 'ArrowLeft' && event.ctrlKey === true) {
      event.preventDefault();
      onReverseIndent(contentItem.id);
    }
  };

  render = (): React.Node => {
    const { contentItem } = this.props;

    return (
      <TypeBlockWrapper
        data-test-id="content-item-editable-display-paragraph"
        {..._.pick(this.props, passThroughProps)}
        iconName="paragraph"
      >
        <EditableTextContent
          multiline={true}
          initialText={contentItem.text}
          initialIsActive={contentItem.isEditing}
          onActivate={this.onEditableTextContentActivate}
          onDeactivate={this.onEditableTextContentDeactivate}
          onInput={this.onEditableTextContentInput}
          onKeyDown={this.onEditableTextContentKeyDown}
        />
      </TypeBlockWrapper>
    );
  };
}

const Paragraph = PureParagraph;

export { PureParagraph };
export default Paragraph;
