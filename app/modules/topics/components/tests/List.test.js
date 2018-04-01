// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureList } from '../List';

describe(`List`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureList
        {...dummyTranslatorProps}
        topicIds={[]}
        lastTopicId="abcde"
        onAddButtonClick={(): void => {}}
        onEditButtonClick={(): void => {}}
        onRemoveButtonClick={(): void => {}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
