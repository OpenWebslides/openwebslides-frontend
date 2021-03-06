// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import NewTopicCard, { PureNewTopicCard } from '.';

describe(`NewTopicCard`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyOnAddTopic: any;

  beforeEach((): void => {
    dummyTitle = 'Lorem ipsum';
    dummyDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    dummyOnAddTopic = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicCard onAddTopic={dummyOnAddTopic} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`calls the passed onAddTopic function, when its form is submitted`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <NewTopicCard onAddTopic={dummyOnAddTopic} />
      </DummyProviders>,
    );
    const onSubmit = enzymeWrapper.find('PureTopicForm').at(0).props().onSubmit;

    onSubmit({ title: dummyTitle, description: dummyDescription });
    expect(dummyOnAddTopic).toHaveBeenCalledWith(dummyTitle, dummyDescription);
  });

});
