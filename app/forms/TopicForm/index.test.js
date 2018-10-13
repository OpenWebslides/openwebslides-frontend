// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import TopicForm, { PureTopicForm } from '.';

describe(`TopicForm`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicForm {...dummyProviderProps.translatorProps} {...dummyProviderProps.formProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <TopicForm>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </TopicForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

});
