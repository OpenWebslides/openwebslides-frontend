// @flow

import * as React from 'react';

import { Form, Input, TextArea } from 'semantic-ui-react';

import InlineMarkdown from 'core-components/inline-markdown';

type PassedProps = {
  multiline: boolean,
  initialText: string,
  initialIsActive: boolean,
  onInput?: (text: string) => void,
  onActivate?: () => void,
  onDeactivate?: (text: string) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
};

type Props = PassedProps;

type ComponentState = {
  initialIsActive: boolean,
  isActive: boolean,
  initialText: string,
  text: string,
};

class EditableTextContent extends React.Component<Props, ComponentState> {
  static defaultProps = {
    multiline: false,
    initialText: '',
    initialIsActive: false,
    onInput: undefined,
    onActivate: undefined,
    onDeactivate: undefined,
    onKeyDown: undefined,
  };

  state: ComponentState = {
    initialIsActive: false,
    isActive: false,
    initialText: '',
    text: '',
  };

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
    if (this.props.onKeyDown) this.props.onKeyDown(event);
  };

  renderAsInput = (): React.Node => {
    return (
      <Form>
        {
          (this.props.multiline)
            ? (
              <TextArea
                className="editable-text-content__input editable-text-content__input--multiline"
                data-test-id="editable-text-content__input"
                autoHeight={true}
                value={this.state.text}
                autoFocus={this.state.isActive}
                onInput={this.handleInput}
                onBlur={this.handleDeactivate}
                onKeyDown={this.handleKeyDown}
                ref={this.handleRef}
              />
            )
            : (
              <Input
                className="editable-text-content__input editable-text-content__input--singleline"
                data-test-id="editable-text-content__input"
                fluid={true}
                value={this.state.text}
                autoFocus={this.state.isActive}
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
        className="editable-text-content__text"
        data-test-id="editable-text-content__text"
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
      <div
        className="editable-text-content"
        data-test-id="editable-text-content"
      >
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
