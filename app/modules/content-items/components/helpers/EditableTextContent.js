// @flow

import * as React from 'react';
import ReactMarkdown from 'react-markdown';

import { Input } from 'semantic-ui-react';

type Props = {
  text: string,
  onActivate: (text: string) => void,
  onDeactivate: (text: string) => void,
};

type State = {
  isActive: boolean,
};

class EditableTextContent extends React.Component<Props, State> {
  static allowedMarkdownTypes = [
    'emphasis',
    'strong',
    'inlineCode',
    'link',
  ];

  constructor(props: Props): void {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidUpdate = (): void => {
    if (this.state.isActive && this.inputRef != null) {
      this.inputRef.focus();
    }
  };

  inputRef: ?HTMLInputElement;

  handleRef = (c: ?HTMLInputElement): void => {
    this.inputRef = c;
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
      <Input
        fluid={true}
        value={this.props.text}
        onBlur={this.deactivate}
        ref={this.handleRef}
      />
    );
  };

  renderAsText = (): React.Node => {
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div
        role="link"
        tabIndex={0}
        onClick={this.activate}
        onFocus={this.activate}
        style={{ cursor: 'pointer' }}
      >
        <ReactMarkdown
          source={this.props.text}
          allowedTypes={EditableTextContent.allowedMarkdownTypes}
          unwrapDisallowed={true}
        />
      </div>
    );
    /* eslint-enable */
  };

  render = (): React.Node => {
    if (this.state.isActive) {
      return this.renderAsInput();
    }
    else {
      return this.renderAsText();
    }
  };
}

export default EditableTextContent;
