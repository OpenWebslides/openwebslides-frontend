// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import EditableTextContent from '.';

describe(`EditableTextContent`, (): void => {

  let dummyText: string;
  let dummyOnSubmit: any;
  let dummyOnDeactivate: any;
  let dummyOnRemove: any;
  let dummyEvent: any;

  let textSelector: string;
  let inputSelector: string;

  beforeEach((): void => {
    dummyText = 'Lorem ipsum dolor sit amet.';
    dummyOnSubmit = jest.fn();
    dummyOnDeactivate = jest.fn();
    dummyOnRemove = jest.fn();

    dummyEvent = { preventDefault: jest.fn() };

    textSelector = `[data-test-id="editable-text-content__text"]`;
    // Using [data-test-id="editable-text-content__input"] as a selector won't work if the element
    // is in singleline mode because Semantic UI wraps the <input> element in a <div>.
    // Selecting the element that has an [onBlur] attribute seems like a good way to make sure
    // the form element itself is selected, and works for both <input> and <textarea>. #TODO
    inputSelector = '[onBlur]';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders its text prop`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    expect(enzymeWrapper.text()).toContain(dummyText);
  });

  it(`renders itself in text mode, when it has not been interacted with yet`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`renders itself in text mode, when it is in singleline input mode and receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`renders itself in text mode, when it is in multiline input mode and receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
        multiline={true}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`rerenders itself, when it is in input mode and receives an input event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

    const renderSpy = jest.spyOn(enzymeWrapper.instance(), 'render');
    enzymeWrapper.find(inputSelector).hostNodes().simulate('input');
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it(`renders itself with a maxLength, if one was defined`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
        maxLength={20}
      />,
    );

    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    expect(enzymeWrapper.find(inputSelector).hostNodes().props().maxLength).toStrictEqual(20);
  });

  it(`renders itself without a maxLength, if one was not defined`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );

    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    expect(enzymeWrapper.find(inputSelector).hostNodes().props().maxLength).toBeUndefined();
  });

  it(`renders itself in input mode, when it is in text mode and receives a left button click event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(1);
  });

  it(`renders itself in text mode, when it is in text mode and receives a right button click event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 2 });
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`calls event.preventDefault(), when it is in text mode and receives a mouseDown event`, (): void => {
    const dummyPreventDefault = jest.fn();
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('mouseDown', { preventDefault: dummyPreventDefault });
    expect(dummyPreventDefault).toHaveBeenCalledWith();
  });

  it(`renders itself in text mode and calls the passed onSubmit and onDeactivate functions with the correct arguments, when it is in input mode and receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(1);
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
    expect(dummyOnSubmit).toHaveBeenCalledWith(dummyText);
    expect(dummyOnDeactivate).toHaveBeenCalledWith(false);
  });

  it(`calls the passed onSubmit and onDeactive functions, when it is in input mode and the ENTER key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.instance().setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    enzymeWrapper.instance().handleKeyEvent('enter', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyOnSubmit).toHaveBeenCalledWith(`${dummyText}${dummyText}`);
    expect(dummyOnDeactivate).toHaveBeenCalledWith(true);
  });

  it(`resets the text value and calls the passed onDeactive function, when it is in input mode and the ESC key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.instance().setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    enzymeWrapper.instance().handleKeyEvent('esc', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(enzymeWrapper.instance().state.text).toStrictEqual(dummyText);
    expect(enzymeWrapper.instance().state.isActive).toBe(false);
    expect(dummyOnDeactivate).toHaveBeenCalledWith(false);
  });

  it(`calls the passed onRemove function, when it is in input mode, the text value is empty and the BACKSPACE key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.instance().setState({ text: '' });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    enzymeWrapper.instance().handleKeyEvent('backspace', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyOnRemove).toHaveBeenCalledTimes(1);
  });

  it(`does not call the passed onRemove function, when it is in input mode, and the text value is not empty and the BACKSPACE key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <EditableTextContent
        initialText={dummyText}
        onSubmit={dummyOnSubmit}
        onDeactivate={dummyOnDeactivate}
        onRemove={dummyOnRemove}
      />,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.instance().setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    enzymeWrapper.instance().handleKeyEvent('backspace', dummyEvent);

    expect(dummyEvent.preventDefault).not.toHaveBeenCalled();
    expect(dummyOnRemove).not.toHaveBeenCalled();
  });

  describe(`getDerivedStateFromProps`, (): void => {

    it(`returns an object containing the new text and initialText, when the new initialText prop is different from the previous one`, (): void => {
      const dummyNewText = `${dummyText}${dummyText}`;
      const dummyPrevState = {
        initialIsActive: false,
        isActive: false,
        initialText: dummyText,
        text: dummyText,
      };
      const dummyNextProps = {
        multiline: false,
        maxLength: undefined,
        initialText: dummyNewText,
        initialIsActive: false,
        onSubmit: dummyOnSubmit,
        onDeactivate: dummyOnDeactivate,
        onRemove: dummyOnRemove,
      };
      const result = EditableTextContent.getDerivedStateFromProps(dummyNextProps, dummyPrevState);
      expect(result).toStrictEqual({
        initialText: dummyNewText,
        text: dummyNewText,
      });
    });

    it(`returns an object containing the new isActive and initialIsActive, when the new initialIsActive prop is different from the previous one`, (): void => {
      const dummyPrevState = {
        initialIsActive: false,
        isActive: false,
        initialText: dummyText,
        text: dummyText,
      };
      const dummyNextProps = {
        multiline: false,
        maxLength: undefined,
        initialText: dummyText,
        initialIsActive: true,
        onSubmit: dummyOnSubmit,
        onDeactivate: dummyOnDeactivate,
        onRemove: dummyOnRemove,
      };
      const result = EditableTextContent.getDerivedStateFromProps(dummyNextProps, dummyPrevState);
      expect(result).toStrictEqual({
        initialIsActive: true,
        isActive: true,
      });
    });

    it(`returns an empty object, when the new initialText prop is the same as the previous one and the new intitialIsActive prop is the same as the previous one`, (): void => {
      const dummyPrevState = {
        initialIsActive: false,
        isActive: false,
        initialText: dummyText,
        text: dummyText,
      };
      const dummyNextProps = {
        multiline: false,
        maxLength: undefined,
        initialText: dummyText,
        initialIsActive: false,
        onSubmit: dummyOnSubmit,
        onDeactivate: dummyOnDeactivate,
        onRemove: dummyOnRemove,
      };
      const result = EditableTextContent.getDerivedStateFromProps(dummyNextProps, dummyPrevState);
      expect(result).toStrictEqual({});
    });

  });

});
