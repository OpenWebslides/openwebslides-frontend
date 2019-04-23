// @flow

import * as React from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import InlineMarkdown from 'components/InlineMarkdown';

type PassedProps = {|
  multiline: boolean,
  maxLength: ?number,
  initialText: string,
  initialIsActive: boolean,
  onSubmit: (text: string) => void,
  onDeactivate: (addEmptyItem: boolean) => void,
  onRemove: () => void,
|};

type Props = {| ...PassedProps |};

type ComponentState = {|
  initialIsActive: boolean,
  isActive: boolean,
  initialText: string,
  text: string,
|};

const handleKeys = [
  'enter',
  'esc',
  'backspace',
];

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
  };

  handleInput = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({ text: event.currentTarget.value });
  };

  handleMouseDown = (event: SyntheticMouseEvent<HTMLElement>): void => {
    // Prevent focus event from being fired as a result of the mouse click
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

  renderAsInput(): React.Node {
    const { multiline, maxLength } = this.props;
    const { text } = this.state;

    return (
      <Form>
        <KeyboardEventHandler
          handleKeys={handleKeys}
          onKeyEvent={this.handleKeyEvent}
          isExclusive={true}
        >
          {(multiline)
            ? (
              <TextArea
                className="editable-text-content__input editable-text-content__input--multiline"
                data-test-id="editable-text-content__input"
                value={text}
                autoFocus={true}
                maxLength={maxLength}
                onInput={this.handleInput}
                onBlur={this.handleBlur}
              />
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
