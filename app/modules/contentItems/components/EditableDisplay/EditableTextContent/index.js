// @flow

import * as React from 'react';
import { Form, Input, TextArea, Ref } from 'semantic-ui-react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import InlineMarkdown from 'components/InlineMarkdown';

import MarkdownToolbar from '../../MarkdownToolbar';
import * as m from '../../../model';

type PassedProps = {|
  contentItem: m.ContentItem,
  multiline: boolean,
  maxLength: ?number,
  initialText: string,
  initialIsActive: boolean,
  onSubmit: (text: string) => void,
  onDeactivate: (addEmptyItem: boolean) => void,
  onRemove: () => void,
  onIndent: () => void,
  onUnindent: () => void,
|};

type Props = {| ...PassedProps |};

type ComponentState = {|
  initialIsActive: boolean,
  isActive: boolean,
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
    initialIsActive: false,
  };

  // bug: see https://github.com/yannickcr/eslint-plugin-react/issues/2061
  /* eslint-disable react/no-unused-state */
  state: ComponentState = {
    initialIsActive: false,
    isActive: false,
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

    if (state.initialIsActive !== props.initialIsActive) {
      nextState.initialIsActive = props.initialIsActive;
      nextState.isActive = props.initialIsActive;
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
      this.setState({ text: initialText, isActive: false });
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

  handleMouseDown = (event: SyntheticMouseEvent<HTMLElement>): void => {
    // Prevent blur event from being fired as a result of the mouse click
    event.preventDefault();
  };

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    // Only activate if left mouse button was clicked
    if (event.button === 0) {
      this.setState({ isActive: true });
    }
  };

  handleBlur = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { onSubmit, onDeactivate } = this.props;

    this.setState({ isActive: false });
    onSubmit(event.currentTarget.value);
    onDeactivate(false);
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

  handleChange = (): void => {
    if (!this.ghostRef) return;

    this.setState({ height: this.ghostRef.clientHeight });
  };

  fieldRef: ?HTMLTextAreaElement | ?HTMLInputElement;

  ghostRef: ?HTMLDivElement;

  renderAsInput(): React.Node {
    const { contentItem, multiline, maxLength, onIndent, onUnindent } = this.props;
    const { text, height } = this.state;

    return (
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
    );
  }

  renderAsText(): React.Node {
    const { text } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div
        className="editable-text-content__text"
        data-test-id="editable-text-content__text"
        role="link"
        tabIndex={-1}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
      >
        <InlineMarkdown text={text} />
      </div>
    );
    /* eslint-enable */
  }

  render(): React.Node {
    const { isActive } = this.state;

    return (
      <div
        className="editable-text-content"
        data-test-id="editable-text-content"
      >
        {(isActive) ? this.renderAsInput() : this.renderAsText()}
      </div>
    );
  }
}

export default EditableTextContent;
