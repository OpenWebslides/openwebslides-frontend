// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureFeedbackForm, type FeedbackFormValues } from '.';

describe(`FeedbackForm`, (): void => {

  let dummyFormProps: FeedbackFormValues;

  beforeEach((): void => {
    dummyFormProps = {
      feedback: 'dummyFeedback',
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureFeedbackForm {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`validates form props when required is TRUE`, (): void => {
    const enzymeWrapper = shallow(<PureFeedbackForm {...dummyProviderProps.translatorProps} required={true} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, feedback: '' })).toHaveProperty('feedback');
  });

  it(`validates form props when required is FALSE`, (): void => {
    const enzymeWrapper = shallow(<PureFeedbackForm {...dummyProviderProps.translatorProps} required={false} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, feedback: '' })).not.toHaveProperty('feedback');
  });

});