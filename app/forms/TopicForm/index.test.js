// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';

import TopicForm, { PureTopicForm, type TopicFormValues } from '.';

describe(`TopicForm`, (): void => {

  let dummyFormProps: TopicFormValues;

  beforeEach((): void => {
    dummyFormProps = {
      title: 'dummyTitle',
      description: 'dummyDescription',
    };
  });

  it(`renders default buttons if no children are specified`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <TopicForm />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSubmitButtonGroup')).toHaveLength(1);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicForm {...dummyProviderProps.translatorProps} />,
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

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureTopicForm {...dummyProviderProps.translatorProps} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, title: '' })).toHaveProperty('title');
  });

});
