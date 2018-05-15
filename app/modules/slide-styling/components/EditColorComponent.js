// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { TwitterPicker } from 'react-color';
import type { Identifier } from 'types/model';
import type { State } from 'types/state';
import authentication from 'modules/authentication';
import type { ContentItemType } from 'modules/content-items';
import { getAllSlideStylingIdsByUserId, getById } from '../selectors';
import type { SlideStyling } from '../model';
import { editContentTypeColorInState } from '../actions';
import { contentItemTypes } from '../../content-items/model';


const { getAccount } = authentication.selectors;

type PassedProps = {
};

type StateProps = {
  userId: Identifier,
  slideStyling: SlideStyling,
  slideStylingId: Identifier,
};

type DispatchProps = {
  onEditContentTypeColorInState: (
    id: Identifier, contentItemType: ContentItemType, newColor: string
  ) => void,
};
type Props = StateProps & DispatchProps & PassedProps;

const mapStateToProps = (state: State): StateProps => {
  const account = getAccount(state);

  const currentUser = account != null ? account.id : 'adkqmq5ds5';

  const slideStylingIds: Array<Identifier> = getAllSlideStylingIdsByUserId(state, currentUser);

  const slideStyling: SlideStyling = getById(state, { id: slideStylingIds[0] });
  console.log(slideStylingIds[0]);
  if (slideStyling == null) {
    throw new Error(`ContentItem with id "${slideStylingIds[0]}" could not be found.`);
  }
  return {
    slideStyling,
    userId: currentUser,
    slideStylingId: slideStylingIds[0],
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onEditContentTypeColorInState: (
      id: Identifier, contentItemType: ContentItemType, newColor: string): void => {
      dispatch(
        editContentTypeColorInState(id, contentItemType, newColor),
      );
    },
  };
};


const PureColorPicker = (props: Props, state: State): React.Node => {
  const {
    onEditContentTypeColorInState,
    slideStyling,
  } = props;
  // eslint-disable-next-line flowtype/require-parameter-type
  const editColorHeading = (color): void => {
    console.log(`${color.hex}`);
    onEditContentTypeColorInState(slideStyling.id, contentItemTypes.HEADING, color.hex);

    console.log('na setten heading');
    console.log(slideStyling);
  };
  // eslint-disable-next-line flowtype/require-parameter-type
  const editColorParagraph = (color): void => {
    console.log(`${color.hex}`);
    onEditContentTypeColorInState(slideStyling.id, contentItemTypes.PARAGRAPH, color.hex);

    const newSlideStyling: SlideStyling = getById(state, { id: slideStyling.id });
    console.log('na setten paragraph');
    console.log(newSlideStyling);
  };
  const colors: Array<string> = ['#000000', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];
  return (
    <div className="colorPicker">
      <div id="ColorPickerHeading">
        <h6>Change heading color</h6>
        <TwitterPicker
          triangle="hide"
          colors={colors}
          color={props.slideStyling.rules[contentItemTypes.HEADING].color}
          onChangeComplete={editColorHeading}
        />
      </div>
      <div className="ColorPickerParagraph">
        <h6>Change heading color</h6>
        <TwitterPicker
          triangle="hide"
          colors={colors}
          color={props.slideStyling.rules[contentItemTypes.PARAGRAPH].color}
          onChange={editColorParagraph}
        />
      </div>
    </div>
  );
};

const EditColorComponent = connect(mapStateToProps, mapDispatchToProps)(PureColorPicker);

export { PureColorPicker };
export default EditColorComponent;

