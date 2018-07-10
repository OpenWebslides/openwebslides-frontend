// @flow

import _ from 'lodash';
import * as React from 'react';
import type { Identifier } from 'types/model';
import EditableTextContent from 'core-components/EditableTextContent';

import * as model from '../../../model';
import TypeBlockWrapper from '../helpers/TypeBlockWrapper';
import { passThroughProps } from '..';

const { HeadingContentItem } = model;

type PassedProps = {
  contentItem: HeadingContentItem,
  onStartEditing: (id: Identifier) => void,
  onEndEditing: (id: Identifier) => void,
  onEditPlainText: (id: Identifier, text: string) => void,
  onAddEmptySubItem: (id: Identifier) => void,
  onRemove: (id: Identifier) => void,
  onIndent: (id: Identifier) => void,
  onReverseIndent: (id: Identifier) => void,
};

type Props = PassedProps;

class PureHeading extends React.Component<Props> {
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
      this.props.onAddEmptySubItem(this.props.contentItem.id);
    }
    else if (event.key === 'Backspace' && this.props.contentItem.text === '') {
      event.preventDefault();
      this.props.onRemove(this.props.contentItem.id);
    }
    else if (event.key === 'ArrowRight' && event.ctrlKey === true) {
      event.preventDefault();
      this.props.onIndent(this.props.contentItem.id);
    }
    else if (event.key === 'ArrowLeft' && event.ctrlKey === true) {
      event.preventDefault();
      this.props.onReverseIndent(this.props.contentItem.id);
    }
  };

  render = (): React.Node => {
    const { contentItem } = this.props;

    return (
      <TypeBlockWrapper
        data-test-id="content-item-editable-display-heading"
        {..._.pick(this.props, passThroughProps)}
        iconName="header"
      >
        <EditableTextContent
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

const Heading = PureHeading;

export { PureHeading };
export default Heading;
