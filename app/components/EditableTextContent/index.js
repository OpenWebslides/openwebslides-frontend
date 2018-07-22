// @flow

import * as React from 'react';
import { Form, Input, TextArea } from 'semantic-ui-react';

import InlineMarkdown from 'components/InlineMarkdown';

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

  handleActivate = (): void => {
    const { onActivate } = this.props;
    this.setState({ isActive: true });
    if (onActivate) onActivate();
  };

  handleDeactivate = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { onDeactivate } = this.props;
    this.setState({ isActive: false });
    if (onDeactivate) onDeactivate(event.currentTarget.value);
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>): void => {
    const { onKeyDown } = this.props;
    if (onKeyDown) onKeyDown(event);
  };

  fieldRef: ?HTMLInputElement;

  renderAsInput(): React.Node {
    const { multiline } = this.props;
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
              value={text}
              autoFocus={isActive}
              onInput={this.handleInput}
              onBlur={this.handleDeactivate}
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
        onClick={this.handleActivate}
        onFocus={this.handleActivate}
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
