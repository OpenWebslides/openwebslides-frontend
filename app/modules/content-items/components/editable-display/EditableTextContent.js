// @flow

import * as React from 'react';

import { Form, Input, TextArea } from 'semantic-ui-react';

import InlineMarkdown from 'core-components/inline-markdown';

type Props = {
  multiline: boolean,
  initialText: string,
  onInput?: (text: string) => void,
  onActivate?: () => void,
  onDeactivate?: (text: string) => void,
  onKeyDown?: (key: string, ctrlKey: boolean, shiftKey: boolean, altKey: boolean) => void,
  className: string,
  textClassNameSuffix: string,
  inputClassNameSuffix: string,
};

type ComponentState = {
  isActive: boolean,
  text: string,
};

class EditableTextContent extends React.Component<Props, ComponentState> {
  static defaultProps = {
    multiline: false,
    initialText: '',
    className: 'editable-text-content',
    textClassNameSuffix: '__text',
    inputClassNameSuffix: '__input',
  };

  static getDerivedStateFromProps = (
    nextProps: Props,
    prevState: ComponentState,
  ): $Shape<ComponentState> => {
    const nextState: $Shape<ComponentState> = {};

    if (prevState.text !== nextProps.initialText) {
      nextState.text = nextProps.initialText;
    }

    return nextState;
  };

  state: ComponentState = {
    isActive: false,
    text: '',
  };

  componentDidUpdate = (): void => {
    if (this.state.isActive && this.fieldRef != null) {
      this.fieldRef.focus();
    }
  };

  fieldRef: ?HTMLInputElement;

  handleRef = (c: ?HTMLInputElement): void => {
    this.fieldRef = c;
  };

  handleInput = (event: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({ text: event.currentTarget.value });
    if (this.props.onInput) {
      this.props.onInput(event.currentTarget.value);
    }
  };

  handleActivate = (): void => {
    this.setState({ isActive: true });
    if (this.props.onActivate) this.props.onActivate();
  };

  handleDeactivate = (event: SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ isActive: false });
    if (this.props.onDeactivate) this.props.onDeactivate(event.currentTarget.value);
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event.key, event.ctrlKey, event.shiftKey, event.altKey);
    }
  };

  renderAsInput = (): React.Node => {
    return (
      <Form>
        {
          (this.props.multiline)
            ? (
              <TextArea
                className={`${this.props.className}${this.props.inputClassNameSuffix} ${this.props.className}${this.props.inputClassNameSuffix}--multiline`}
                autoHeight={true}
                value={this.state.text}
                onInput={this.handleInput}
                onBlur={this.handleDeactivate}
                onKeyDown={this.handleKeyDown}
                ref={this.handleRef}
              />
            )
            : (
              <Input
                className={`${this.props.className}${this.props.inputClassNameSuffix} ${this.props.className}${this.props.inputClassNameSuffix}--singleline`}
                fluid={true}
                value={this.state.text}
                onInput={this.handleInput}
                onBlur={this.handleDeactivate}
                onKeyDown={this.handleKeyDown}
                ref={this.handleRef}
              />
            )
        }
      </Form>
    );
  };

  renderAsText = (): React.Node => {
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div
        className={`${this.props.className}${this.props.textClassNameSuffix}`}
        role="link"
        tabIndex={0}
        onClick={this.handleActivate}
        onFocus={this.handleActivate}
      >
        <InlineMarkdown text={this.state.text} />
      </div>
    );
    /* eslint-enable */
  };

  render = (): React.Node => {
    return (
      <div className={this.props.className}>
        {
          (this.state.isActive)
            ? this.renderAsInput()
            : this.renderAsText()
        }
      </div>
    );
  };
}

export default EditableTextContent;
