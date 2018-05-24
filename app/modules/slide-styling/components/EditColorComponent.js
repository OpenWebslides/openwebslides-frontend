// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { TwitterPicker } from 'react-color';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';
import type { ContentItemType } from 'modules/content-items';
import type { SlideStyling } from '../model';
import { editContentTypeColorInState } from '../actions';
import { contentItemTypes } from '../../content-items/model';

type PassedProps = {
  userId: Identifier,
  slideStyling: SlideStyling,
};

type StateProps = {};

type DispatchProps = {
  onEditContentTypeColorInState: (
    id: Identifier, contentItemType: ContentItemType, newColor: string, font: string
  ) => void,
};
type Props = DispatchProps & PassedProps;

const mapStateToProps = (state: State): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onEditContentTypeColorInState: (
      id: Identifier, contentItemType: ContentItemType, newColor: string, font: string): void => {
      dispatch(
        editContentTypeColorInState(id, contentItemType, newColor, font),
      );
    },
  };
};


const PureEditColorComponent = (props: Props, state: State): React.Node => {
  const {
    onEditContentTypeColorInState,
    slideStyling,
  } = props;
  // eslint-disable-next-line flowtype/require-parameter-type
  const editColorHeading = (color): void => {
    onEditContentTypeColorInState(
      slideStyling.id,
      contentItemTypes.HEADING,
      color.hex, slideStyling.rules[contentItemTypes.HEADING].font);
  };
  // eslint-disable-next-line flowtype/require-parameter-type
  const editColorParagraph = (color): void => {
    onEditContentTypeColorInState(
      slideStyling.id,
      contentItemTypes.PARAGRAPH,
      color.hex, slideStyling.rules[contentItemTypes.PARAGRAPH].font);
  };
  const colors: Array<string> = ['#000000', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
  return (
    <div className="colorPicker ui grid">
      <div id="ColorPickerHeading"><br />
        <h5>Change heading color</h5>
        <TwitterPicker
          triangle="hide"
          colors={colors}
          color={slideStyling.rules[contentItemTypes.HEADING].color}
          onChangeComplete={editColorHeading}
        />
      </div>
      <div className="ColorPickerParagraph"><br />
        <h5>Change paragraph color</h5>
        <TwitterPicker
          triangle="hide"
          colors={colors}
          color={slideStyling.rules[contentItemTypes.PARAGRAPH].color}
          onChange={editColorParagraph}
        />
      </div>
    </div>
  );
};

const EditColorComponent =
  connect(mapStateToProps, mapDispatchToProps)(PureEditColorComponent);

export { PureEditColorComponent };
export default EditColorComponent;

