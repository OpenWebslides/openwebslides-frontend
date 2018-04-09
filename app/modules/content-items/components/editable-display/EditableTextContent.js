// @flow

import * as React from 'react';

import { Form, Input, TextArea } from 'semantic-ui-react';

import InlineMarkdown from 'core-components/inline-markdown';

type Props = {
  multiline: boolean,
  text: string,
  onActivate: (text: string) => void,
  onDeactivate: (text: string) => void,
  className: string,
  textClassNameSuffix: string,
  inputClassNameSuffix: string,
};

type State = {
  isActive: boolean,
};

class EditableTextContent extends React.Component<Props, State> {
  static defaultProps = {
    multiline: false,
    className: 'editable-text-content',
    textClassNameSuffix: '__text',
    inputClassNameSuffix: '__input',
  };

  constructor(props: Props): void {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidUpdate = (): void => {
    if (this.state.isActive && this.fieldRef != null) {
      this.fieldRef.focus();
    }
  };

  fieldRef: ?HTMLTextAreaElement;

  handleRef = (c: ?HTMLTextAreaElement): void => {
    this.fieldRef = c;
  };

  activate = (): void => {
    this.setState({ isActive: true });
    this.props.onActivate(this.props.text);
  };

  deactivate = (): void => {
    this.setState({ isActive: false });
    this.props.onDeactivate(this.props.text);
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
                value={this.props.text}
                onBlur={this.deactivate}
                ref={this.handleRef}
              />
            )
            : (
              <Input
                className={`${this.props.className}${this.props.inputClassNameSuffix} ${this.props.className}${this.props.inputClassNameSuffix}--singleline`}
                fluid={true}
                value={this.props.text}
                onBlur={this.deactivate}
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
        onClick={this.activate}
        onFocus={this.activate}
      >
        <InlineMarkdown text={this.props.text} />
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
