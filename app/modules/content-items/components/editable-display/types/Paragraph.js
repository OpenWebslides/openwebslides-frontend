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
  onEditPlainText: (id: Identifier, text: string, isEditing: boolean) => void,
  onAddEmptySiblingItemBelow: (id: Identifier) => void,
};

type Props = PassedProps;

class PureParagraph extends React.Component<Props> {
  onEditableTextContentInput = (text: string): void => {
    this.props.onEditPlainText(this.props.contentItem.id, text, true);
  };

  onEditableTextContentDeactivate = (text: string): void => {
    this.props.onEditPlainText(this.props.contentItem.id, text, false);
  };

  onEditableTextContentKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.onAddEmptySiblingItemBelow(this.props.contentItem.id);
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
          onInput={this.onEditableTextContentInput}
          onDeactivate={this.onEditableTextContentDeactivate}
          onKeyDown={this.onEditableTextContentKeyDown}
        />
      </DisplayBlockWrapper>
    );
  };
}

const Paragraph = PureParagraph;

export { PureParagraph };
export default Paragraph;
