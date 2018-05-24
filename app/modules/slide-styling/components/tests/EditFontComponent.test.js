// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { contentItemTypes } from 'modules/content-items/model';
import { PureEditFontComponent } from '../EditFontComponent';

describe('EditFontComponent', (): void => {
  const dummyOnEditFontInState = (): void => {};
  it('renders without errors', (): void => {
    const enzymeWrapper = shallow(
      <PureEditFontComponent
        userId="adkqmq5ds5"
        slideStyling={{
          id: 'azd15dsqz1',
          userId: 'adkqmq5ds5',
          rules: {
            [contentItemTypes.PARAGRAPH]: {
              color: '#000000',
              font: 'Verdana',
            },
            [contentItemTypes.HEADING]: {
              color: '#000000',
              font: 'Verdana',
            },
          },
        }}
        onEditFontInState={dummyOnEditFontInState}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });
});
