// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import { contentItemTypes } from 'modules/content-items/model';
import { PureEditColorComponent } from '../EditColorComponent';

describe('EditColorComponent', (): void => {
  const dummyOnEditContentTypeColorInState = (): void => {};
  const dummyOnAddToState = (): void => {};
  it('renders without errors', (): void => {
    const enzymeWrapper = shallow(
      <PureEditColorComponent
        userId="adkqmq5ds5"
        slideStyling={{
          id: 'azd15dsqz1',
          userId: 'adkqmq5ds5',
          rules: {
            [contentItemTypes.PARAGRAPH]: {
              color: '#000000',
            },
            [contentItemTypes.HEADING]: {
              color: '#000000',
            },
          },
        }}
        onEditContentTypeColorInState={dummyOnEditContentTypeColorInState}
        onAddToState={dummyOnAddToState}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });
});
