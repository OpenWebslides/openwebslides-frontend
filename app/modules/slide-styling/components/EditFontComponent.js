// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';
import type { SlideStyling } from '../model';
import { editFontInState } from '../actions';
import { contentItemTypes } from '../../content-items/model';

type PassedProps = {
  userId: Identifier,
  slideStyling: SlideStyling,
};

type StateProps = {};

type ComponentState = {
  selected: string,
};

type DispatchProps = {
  onEditFontInState: (
    id: Identifier, newFont: string, colorHeading: string, colorParagraph: string
  ) => void,
};
type Props = DispatchProps & PassedProps;

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onEditFontInState: (
      id: Identifier, newFont: string, colorHeading: string, colorParagraph: string): void => {
      dispatch(
        editFontInState(id, newFont, colorHeading, colorParagraph),
      );
    },
  };
};


class PureEditFontComponent extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    selected: '',
  };

  render = (): React.Node => {
    const {
      onEditFontInState,
      slideStyling,
    } = this.props;
    const fontOptions = [
      { key: 'ti', value: 'Times New Roman', content: 'Times New Roman', text: 'Times New Roman' },
      { key: 've', value: 'Verdana', content: 'Verdana', text: 'Verdana' },
    ];
    // eslint-disable-next-line flowtype/require-parameter-type
    const editFont = (event, data): void => {
      this.setState({ selected: data.value });
      onEditFontInState(
        slideStyling.id, data.value,
        slideStyling.rules[contentItemTypes.HEADING].color,
        slideStyling.rules[contentItemTypes.PARAGRAPH].color);
    };

    return (
      <div id="ColorPickerHeading"><br />
        <h5>Click to change font of the text</h5>
        <Dropdown
          placeholder={slideStyling.rules[contentItemTypes.HEADING].font}
          trigger={this.state.selected}
          search={true}
          selection={true}
          options={fontOptions}
          onChange={editFont}
        />
      </div>
    );
  };
}

const EditFontComponent =
  connect(mapStateToProps, mapDispatchToProps)(PureEditFontComponent);

export { PureEditFontComponent };
export default EditFontComponent;

