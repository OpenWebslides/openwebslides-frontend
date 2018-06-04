// @flow

import _ from 'lodash';
import * as React from 'react';

import type { Identifier } from 'types/model';

import type { ParagraphContentItem } from '../../../model';

import { passThroughProps } from '..';
import DisplayBlockWrapper from '../DisplayBlockWrapper';
import EditableTextContent from '../EditableTextContent';

type PassedProps = {
  contentItem: ParagraphContentItem,
  onStartEditing: (id: Identifier) => void,
  onEndEditing: (id: Identifier) => void,
  onEditPlainText: (id: Identifier, text: string) => void,
  onAddEmptySiblingItemBelow: (id: Identifier) => void,
  onRemove: (id: Identifier) => void,
};

type Props = PassedProps;

class PureParagraph extends React.Component<Props> {
  onEditableTextContentActivate = (): void => {
    this.props.onStartEditing(this.props.contentItem.id);
  };

  onEditableTextContentDeactivate = (): void => {
    this.props.onEndEditing(this.props.contentItem.id);
  };

  onEditableTextContentInput = (text: string): void => {
    this.props.onEditPlainText(this.props.contentItem.id, text);
  };

  onEditableTextContentKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.onAddEmptySiblingItemBelow(this.props.contentItem.id);
    }
    else if (event.key === 'Backspace' && this.props.contentItem.text === '') {
      event.preventDefault();
      this.props.onRemove(this.props.contentItem.id);
    }
  };

  render = (): React.Node => {
    const { contentItem } = this.props;

    return (
      <DisplayBlockWrapper
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
      </DisplayBlockWrapper>
    );
  };
}

const Paragraph = PureParagraph;

export { PureParagraph };
export default Paragraph;
