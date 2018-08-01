// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps, dummyTopicData } from 'lib/testResources';

import { PureEditor } from '.';

describe(`Editor`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyTopic = { ...dummyTopicData.topic };
    const dummyOnSaveButtonClick = jest.fn();
    const dummyOnLoadButtonClick = jest.fn();

    const enzymeWrapper = shallow(
      <PureEditor
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        topic={dummyTopic}
        onSaveButtonClick={dummyOnSaveButtonClick}
        onLoadButtonClick={dummyOnLoadButtonClick}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
