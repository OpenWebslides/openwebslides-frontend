// @flow

import * as React from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';

import InlineMarkdown from 'components/InlineMarkdown';

type PassedProps = {|
  multiline: boolean,
  maxLength: ?number,
  initialText: string,
  initialIsActive: boolean,
  onInput?: (text: string) => void,
  onActivate?: () => void,
  onDeactivate?: (text: string) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
|};

type Props = {| ...PassedProps |};

type ComponentState = {|
  initialIsActive: boolean,
  isActive: boolean,
  initialText: string,
  text: string,
|};

class EditableTextContent extends React.Component<Props, ComponentState> {
  static defaultProps = {
    multiline: false,
    maxLength: undefined,
    initialText: '',
    initialIsActive: false,
    onInput: undefined,
    onActivate: undefined,
    onDeactivate: undefined,
    onKeyDown: undefined,
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

  componentDidUpdate(): void {
    const { isActive } = this.state;
    if (isActive && this.fieldRef != null) {
      this.fieldRef.focus();
    }
  }

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

  handleRef = (c: ?HTMLInputElement): void => {
    this.fieldRef = c;
  };

  handleInput = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    const { onInput } = this.props;
    this.setState({ text: event.currentTarget.value });
    if (onInput) onInput(event.currentTarget.value);
  };

  handleMouseDown = (event: SyntheticMouseEvent<HTMLElement>): void => {
    // Prevent focus event from being fired as a result of the mouse click
    event.preventDefault();
  };

  handleClick = (event: SyntheticMouseEvent<HTMLElement>): void => {
    // Only activate if left mouse button was clicked
    if (event.button === 0) {
      this.activate();
    }
  };

  handleFocus = (): void => {
    this.activate();
  };

  handleBlur = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.deactivate(event.currentTarget.value);
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const { onKeyDown } = this.props;
    if (onKeyDown) onKeyDown(event);
  };

  activate = (): void => {
    const { onActivate } = this.props;
    this.setState({ isActive: true });
    if (onActivate) onActivate();
  };

  deactivate = (text: string): void => {
    const { onDeactivate } = this.props;
    this.setState({ isActive: false });
    if (onDeactivate) onDeactivate(text);
  };

  fieldRef: ?HTMLInputElement;

  renderAsInput(): React.Node {
    const { multiline, maxLength } = this.props;
    const { text, isActive } = this.state;

    return (
      <Form>
        {(multiline)
          ? (
            <TextArea
              className="editable-text-content__input editable-text-content__input--multiline"
              data-test-id="editable-text-content__input"
              autoHeight={true}
              value={text}
              autoFocus={isActive}
              maxLength={maxLength}
              onInput={this.handleInput}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              ref={this.handleRef}
            />
          )
          : (
            <Input
              className="editable-text-content__input editable-text-content__input--singleline"
              data-test-id="editable-text-content__input"
              fluid={true}
              value={text}
              autoFocus={isActive}
              maxLength={maxLength}
              onInput={this.handleInput}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              ref={this.handleRef}
            />
          )}
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
        tabIndex={0}
        onMouseDown={this.handleMouseDown}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
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
