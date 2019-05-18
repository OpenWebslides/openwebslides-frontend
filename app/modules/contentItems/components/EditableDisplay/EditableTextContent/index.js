// @flow

import * as React from 'react';
import { Form, Input, TextArea, Ref } from 'semantic-ui-react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import MarkdownToolbar from '../../MarkdownToolbar';
import * as m from '../../../model';

type PassedProps = {|
  contentItem: m.ContentItem,
  multiline: boolean,
  maxLength: ?number,
  initialText: string,
  onSubmit: (text: string) => void,
  onDeactivate: (addEmptyItem: boolean) => void,
  onRemove: () => void,
  onIndent: () => void,
  onUnindent: () => void,
|};

type Props = {| ...PassedProps |};

type ComponentState = {|
  initialText: string,
  text: string,
  height: number,
|};

const handleKeys = [
  'enter',
  'esc',
  'backspace',

  'ctrl+b', // Control key
  'meta+b', // Command key

  'ctrl+i', // Control key
  'meta+i', // Command key

  'ctrl+k', // Control key
  'meta+k', // Command key
];

const mapMarkdownTypeToAffix = {
  [m.markdownTypes.STRONG]: { prefix: '**', suffix: '**' },
  [m.markdownTypes.EMPHASIS]: { prefix: '_', suffix: '_' },
  [m.markdownTypes.CODE]: { prefix: '`', suffix: '`' },
  [m.markdownTypes.STRIKETHROUGH]: { prefix: '~~', suffix: '~~' },
  [m.markdownTypes.LINK]: { prefix: '[', suffix: '](url)' },
};

class EditableTextContent extends React.Component<Props, ComponentState> {
  static defaultProps = {
    multiline: false,
    maxLength: undefined,
    initialText: '',
  };

  // bug: see https://github.com/yannickcr/eslint-plugin-react/issues/2061
  /* eslint-disable react/no-unused-state */
  state: ComponentState = {
    initialText: '',
    text: '',
    height: 0,
  };
  /* eslint-enable */

  static getDerivedStateFromProps = (
    props: Props,
    state: ComponentState,
  ): $Shape<ComponentState> => {
    const nextState: $Shape<ComponentState> = {};

    if (state.initialText !== props.initialText) {
      nextState.initialText = props.initialText;
      nextState.text = props.initialText;
    }

    return nextState;
  };

  handleKeyEvent = (key: string, event: SyntheticKeyboardEvent<HTMLElement>): void => {
    const { onSubmit, onDeactivate, onRemove, initialText } = this.props;
    const { text } = this.state;

    if (key === 'enter') {
      event.preventDefault();
      onSubmit(text);
      onDeactivate(true);
    }
    else if (key === 'esc') {
      event.preventDefault();
      this.setState({ text: initialText });
      onDeactivate(false);
    }
    else if (key === 'backspace' && text === '') {
      event.preventDefault();
      onRemove();
    }
    else if (key === 'ctrl+b' || key === 'meta+b') {
      event.preventDefault();
      this.handleEdit(m.markdownTypes.STRONG);
    }
    else if (key === 'ctrl+i' || key === 'meta+i') {
      event.preventDefault();
      this.handleEdit(m.markdownTypes.EMPHASIS);
    }
    else if (key === 'ctrl+k' || key === 'meta+k') {
      event.preventDefault();
      this.handleEdit(m.markdownTypes.LINK);
    }
  };

  handleRef = (c: ?HTMLInputElement): void => {
    this.fieldRef = c;
  };

  handleInputRef = (c: ?Input): void => {
    if (c != null && c.inputRef != null) {
      this.fieldRef = c.inputRef.current;
    }
    else this.fieldRef = null;
  };

  handleGhostRef = (c: ?HTMLDivElement): void => {
    this.ghostRef = c;
  };

  handleInput = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({ text: event.currentTarget.value });
  };

  handleEdit = (type: m.MarkdownType): void => {
    const { text } = this.state;

    const affix = mapMarkdownTypeToAffix[type];

    if (!this.fieldRef) return;

    // Hold on to ref to prevent Flow refinement invalidation
    const ref = this.fieldRef;

    const start = ref.selectionStart;
    const end = ref.selectionEnd;

    this.setState({
      text: `${text.slice(0, start)}${affix.prefix}${text.slice(start, end)}${affix.suffix}${text.slice(end)}`,
    }, (): void => {
      ref.setSelectionRange(
        start + affix.prefix.length,
        end + affix.prefix.length,
      );
    });
  };

  handleBlur = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { onSubmit, onDeactivate } = this.props;

    onSubmit(event.currentTarget.value);
    onDeactivate(false);
  };

  handleChange = (): void => {
    if (!this.ghostRef) return;

    this.setState({ height: this.ghostRef.clientHeight });
  };

  fieldRef: ?HTMLTextAreaElement | ?HTMLInputElement;

  ghostRef: ?HTMLDivElement;

  render(): React.Node {
    const { contentItem, multiline, maxLength, onIndent, onUnindent } = this.props;
    const { text, height } = this.state;

    return (
      <div
        className="editable-text-content"
        data-test-id="editable-text-content"
      >
        <Form>
          <div
            className="editable-text-content__ghost"
            data-test-id="editable-text-content__ghost"
            ref={this.handleGhostRef}
          >
            {text}
          </div>
          <KeyboardEventHandler
            handleKeys={handleKeys}
            onKeyEvent={this.handleKeyEvent}
            isExclusive={true}
          >
            <MarkdownToolbar
              contentItem={contentItem}
              onIndent={onIndent}
              onUnindent={onUnindent}
              onEdit={this.handleEdit}
              data-test-id="editable-text-content__markdown-toolbar"
            />
            {(multiline)
              ? (
                <Ref innerRef={this.handleRef}>
                  <TextArea
                    className="editable-text-content__input editable-text-content__input--multiline"
                    data-test-id="editable-text-content__input"
                    value={text}
                    autoFocus={true}
                    maxLength={maxLength}
                    style={{ minHeight: height }}
                    onInput={this.handleInput}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onFocus={this.handleChange}
                  />
                </Ref>
              )
              : (
                <Input
                  className="editable-text-content__input editable-text-content__input--singleline"
                  data-test-id="editable-text-content__input"
                  fluid={true}
                  value={text}
                  autoFocus={true}
                  maxLength={maxLength}
                  onInput={this.handleInput}
                  onBlur={this.handleBlur}
                  ref={this.handleInputRef}
                />
              )}
          </KeyboardEventHandler>
        </Form>
      </div>
    );
  }
}

export default EditableTextContent;
