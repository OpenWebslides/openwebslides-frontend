// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';

const generateContent = function* (
  action: a.GenerateContentAction,
): Saga<void> {
  const { rootContentItemId } = action.payload;

  // Heading 2
  const headingTwoContentItemId = lib.generateId();
  yield put(actions.addToState(
    headingTwoContentItemId,
    m.contentItemTypes.HEADING,
    {
      contextType: m.contextTypes.SUPER,
      contextItemId: rootContentItemId,
    },
    {
      text: 'Chapter 2: Dolor sit amet',
    },
  ));

  // Heading 2 > Paragraph 3
  const paragraphThreeContentItemId = lib.generateId();
  yield put(actions.addToState(
    paragraphThreeContentItemId,
    m.contentItemTypes.PARAGRAPH,
    {
      contextType: m.contextTypes.SUPER,
      contextItemId: headingTwoContentItemId,
    },
    {
      text: 'Pellentesque posuere, metus posuere malesuada commodo, metus mauris sagittis mi, vel aliquam tortor velit sit amet nunc. Quisque vel rutrum sem, quis fermentum mi. Integer at ultrices magna.',
    },
  ));

  // Heading 1
  const headingOneContentItemId = lib.generateId();
  yield put(actions.addToState(
    headingOneContentItemId,
    m.contentItemTypes.HEADING,
    {
      contextType: m.contextTypes.SUPER,
      contextItemId: rootContentItemId,
    },
    {
      text: 'Chapter 1: Lorem ipsum',
    },
  ));

  // Heading 1 > Paragraph 1
  const paragraphOneContentItemId = lib.generateId();
  yield put(actions.addToState(
    paragraphOneContentItemId,
    m.contentItemTypes.PARAGRAPH,
    {
      contextType: m.contextTypes.SUPER,
      contextItemId: headingOneContentItemId,
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac leo facilisis, faucibus tellus placerat, viverra leo. Etiam blandit nisi sit amet quam dignissim, et pellentesque dolor vulputate. Vivamus vehicula finibus condimentum.',
    },
  ));

  // Heading 1 > Paragraph 1 > Paragraph 2
  const paragraphTwoContentItemId = lib.generateId();
  yield put(actions.addToState(
    paragraphTwoContentItemId,
    m.contentItemTypes.PARAGRAPH,
    {
      contextType: m.contextTypes.SUPER,
      contextItemId: paragraphOneContentItemId,
    },
    {
      text: 'Ut nulla lorem, interdum eu malesuada non, placerat non ex. Pellentesque lacinia malesuada sollicitudin. Etiam posuere aliquam enim, sit amet sollicitudin ex mattis vel. Vivamus vel suscipit turpis, sed scelerisque mi.',
    },
  ));
};

export default generateContent;
