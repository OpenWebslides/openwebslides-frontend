// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import EditableTextContent from '../EditableTextContent';

describe(`EditableTextContent`, (): void => {

  const dummyText = 'Lorem ipsum dolor sit amet.';
  const dummyActivate = jest.fn();
  const dummyDeactivate = jest.fn();
  const dummyClassName = 'editable-text-content';
  const dummyTextClassNameSuffix = '__text';
  const dummyInputClassNameSuffix = '__input';
  const dummyTextClassName = `${dummyClassName}${dummyTextClassNameSuffix}`;
  // const dummyInputClassName = `${dummyClassName}${dummyInputClassNameSuffix}`;
  const textSelector = `.${dummyTextClassName}`;
  // Using dummyInputClassName as a selector won't work if the element is in singleline mode
  // because Semantic UI wraps the <input> element in a <div>.
  // Selecting the element that has an [onBlur] attribute seems like a good way to make sure
  // the form element itself is selected, and works for both <input> and <textarea>.
  const inputSelector = '[onBlur]';

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its text prop`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
      />,
    );
    expect(enzymeWrapper.text()).toContain(dummyText);
  });

  it(`renders itself in text mode, when it has not been interacted with yet`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`renders itself in input mode, when it is in text mode and receives a click event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    enzymeWrapper.find(`.${dummyTextClassName}`).hostNodes().simulate('click');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(1);
  });

  it(`renders itself in input mode, when it is in text mode and receives a focus event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('focus');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(1);
  });

  it(`renders itself in text mode, when it is in input mode and receives a blur event, and when it is in singleline mode`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('focus');
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`renders itself in text mode, when it is in input mode and receives a blur event, and when it is in multiline mode`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        multiline={true}
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('focus');
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`calls the passed onActivate function, when it is in text mode and receives a click event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click');
    expect(dummyActivate).toHaveBeenCalled();
  });

  it(`calls the passed onActivate function, when it is in text mode and receives a focus event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('focus');
    expect(dummyActivate).toHaveBeenCalled();
  });

  it(`calls the passed onDeactivate function, when it is in input render mode and receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        text={dummyText}
        onActivate={dummyActivate}
        onDeactivate={dummyDeactivate}
        className={dummyClassName}
        textClassNameSuffix={dummyTextClassNameSuffix}
        inputClassNameSuffix={dummyInputClassNameSuffix}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('focus');
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    expect(dummyDeactivate).toHaveBeenCalled();
  });

});
