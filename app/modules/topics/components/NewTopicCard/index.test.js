// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { InvalidArgumentError } from 'errors';
import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import actions from '../../actions';

import NewTopicCard, { PureNewTopicCard } from '.';

describe(`NewTopicCard`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;

  let dummyDispatch: any;
  let dummyState: any;

  beforeEach((): void => {
    dummyTitle = 'Lorem ipsum';
    dummyDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    dummyUserId = 'dummyUserId';

    dummyDispatch = jest.fn();
    dummyState = { modules: { apiRequestsStatus: {} } };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicCard
        {...dummyProviderProps.translatorProps}
        userId={dummyUserId}
        onTopicFormSubmit={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`dispatches a topic CREATE action, when its form is submitted with complete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewTopicCard userId={dummyUserId} />
      </DummyProviders>,
    );
    const onTopicFormSubmit = enzymeWrapper.find('PureNewTopicCard').props().onTopicFormSubmit;

    onTopicFormSubmit({ title: dummyTitle, description: dummyDescription });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.create(dummyTitle, dummyDescription, dummyUserId));
  });

  it(`throws an InvalidArgumentError, when its form is submitted with incomplete values`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <NewTopicCard userId={dummyUserId} />
      </DummyProviders>,
    );
    const onTopicFormSubmit = enzymeWrapper.find('PureNewTopicCard').props().onTopicFormSubmit;

    expect((): void => {
      onTopicFormSubmit({});
    }).toThrow(InvalidArgumentError);
  });

});
