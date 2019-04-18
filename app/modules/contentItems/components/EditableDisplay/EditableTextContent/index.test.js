// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import EditableTextContent from '.';

describe(`EditableTextContent`, (): void => {

  let dummyContentItem: m.ContentItem;
  let dummyText: string;

  let dummyFunctionProps: any;

  let dummyEvent: any;

  let textSelector: string;
  let inputSelector: string;

  beforeEach((): void => {
    dummyContentItem = dummyData.paragraphContentItem;
    dummyText = 'Lorem ipsum dolor sit amet.';

    dummyFunctionProps = {
      onSubmit: jest.fn(),
      onDeactivate: jest.fn(),
      onRemove: jest.fn(),
      onIndent: jest.fn(),
      onUnindent: jest.fn(),
    };

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
      <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders its text prop`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.text()).toContain(dummyText);
  });

  it(`renders itself in text mode, when it has not been interacted with yet`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`renders itself in input mode, when it is in text mode and receives a click event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(1);
  });

  it(`renders itself in text mode, when it is in singleline input mode and receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`renders a markdown toolbar when it is in input mode`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    expect(enzymeWrapper.find('[data-test-id="editable-text-content__markdown-toolbar"]')).not.toHaveLength(0);
  });

  it(`renders itself in text mode, when it is in multiline input mode and receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} multiline={true} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`rerenders itself, when it is in input mode and receives an input event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

    const renderSpy = jest.spyOn((enzymeWrapper.find('EditableTextContent').instance(): any), 'render');
    enzymeWrapper.find(inputSelector).hostNodes().simulate('input');
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });

  it(`renders itself with a maxLength, if one was defined`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} maxLength={20} />
      </DummyProviders>,
    );

    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    expect(enzymeWrapper.find(inputSelector).hostNodes().props().maxLength).toStrictEqual(20);
  });

  it(`renders itself without a maxLength, if one was not defined`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );

    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    expect(enzymeWrapper.find(inputSelector).hostNodes().props().maxLength).toBeUndefined();
  });

  it(`renders itself in input mode, when it is in text mode and receives a left button click event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(1);
  });

  it(`renders itself in text mode, when it is in text mode and receives a right button click event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 2 });
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
  });

  it(`calls event.preventDefault(), when it is in text mode and receives a mouseDown event`, (): void => {
    const dummyPreventDefault = jest.fn();
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('mouseDown', { preventDefault: dummyPreventDefault });
    expect(dummyPreventDefault).toHaveBeenCalledWith();
  });

  it(`renders itself in text mode and calls the passed onSubmit and onDeactivate functions with the correct arguments, when it is in input mode and receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(1);
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');
    enzymeWrapper.update();

    expect(enzymeWrapper.find(textSelector).hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find(inputSelector).hostNodes()).toHaveLength(0);
    expect(dummyFunctionProps.onSubmit).toHaveBeenCalledWith(dummyText);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledWith(false);
  });

  it(`calls the passed onSubmit and onDeactive functions, when it is in input mode and the ENTER key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    (enzymeWrapper.find('EditableTextContent').instance(): any).setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('enter', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyFunctionProps.onSubmit).toHaveBeenCalledWith(`${dummyText}${dummyText}`);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledWith(true);
  });

  it(`resets the text value and calls the passed onDeactive function, when it is in input mode and the ESC key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    (enzymeWrapper.find('EditableTextContent').instance(): any).setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('esc', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect((enzymeWrapper.find('EditableTextContent').instance(): any).state.text).toStrictEqual(dummyText);
    expect((enzymeWrapper.find('EditableTextContent').instance(): any).state.isActive).toBe(false);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledWith(false);
  });

  it(`calls the passed onRemove function, when it is in input mode, the text value is empty and the BACKSPACE key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    (enzymeWrapper.find('EditableTextContent').instance(): any).setState({ text: '' });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('backspace', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyFunctionProps.onRemove).toHaveBeenCalledTimes(1);
  });

  it(`does not call the passed onRemove function, when it is in input mode, and the text value is not empty and the BACKSPACE key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });
    (enzymeWrapper.find('EditableTextContent').instance(): any).setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('backspace', dummyEvent);

    expect(dummyEvent.preventDefault).not.toHaveBeenCalled();
    expect(dummyFunctionProps.onRemove).not.toHaveBeenCalled();
  });

  describe(`handleEdit`, (): void => {

    it(`appends a prefix and a suffix into the text when the handleEdit function passed to the markdown toolbar is called and there is nothing selected`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
        </DummyProviders>,
      );

      enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

      // Set cursor position to end of input field
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(dummyText.length, dummyText.length);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.STRONG);

      // Asterisks are appended
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find('EditableTextContent').instance().state.text).toStrictEqual(`${dummyText}****`);

      // Selection is now between the four asterisks
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find(inputSelector).hostNodes().instance().selectionStart).toStrictEqual(dummyText.length + 2);
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find(inputSelector).hostNodes().instance().selectionEnd).toStrictEqual(dummyText.length + 2);
    });

    it(`splices a prefix and a suffix into the text when the handleEdit function passed to the markdown toolbar is called and there is a selection`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
        </DummyProviders>,
      );

      enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

      // Set selection to 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(dummyText.indexOf('ipsum'), dummyText.indexOf('ipsum') + 'ipsum'.length);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.STRONG);

      // Asterisks surround 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      const text = enzymeWrapper.find('EditableTextContent').instance().state.text;
      expect(text).toStrictEqual(`${dummyText.replace('ipsum', '**ipsum**')}`);

      // Selection is still 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find(inputSelector).hostNodes().instance().selectionStart).toStrictEqual(text.indexOf('ipsum'));
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find(inputSelector).hostNodes().instance().selectionEnd).toStrictEqual(text.indexOf('ipsum') + 'ipsum'.length);
    });

    it(`maps the STRONG markdownType argument to the correct affixes`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText="lorem" />
        </DummyProviders>,
      );

      enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

      // Set selection to 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(0, 5);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.STRONG);

      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find('EditableTextContent').instance().state.text).toStrictEqual('**lorem**');
    });

    it(`maps the EMPHASIS markdownType argument to the correct affixes`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText="lorem" />
        </DummyProviders>,
      );

      enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

      // Set selection to 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(0, 5);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.EMPHASIS);

      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find('EditableTextContent').instance().state.text).toStrictEqual('_lorem_');
    });

    it(`maps the CODE markdownType argument to the correct affixes`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText="lorem" />
        </DummyProviders>,
      );

      enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

      // Set selection to 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(0, 5);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.CODE);

      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find('EditableTextContent').instance().state.text).toStrictEqual('`lorem`');
    });

    it(`maps the STRIKETHROUGH markdownType argument to the correct affixes`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText="lorem" />
        </DummyProviders>,
      );

      enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

      // Set selection to 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(0, 5);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.STRIKETHROUGH);

      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find('EditableTextContent').instance().state.text).toStrictEqual('~~lorem~~');
    });

    it(`maps the LINK markdownType argument to the correct affixes`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText="lorem" />
        </DummyProviders>,
      );

      enzymeWrapper.find(textSelector).hostNodes().simulate('click', { button: 0 });

      // Set selection to 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(0, 5);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.LINK);

      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find('EditableTextContent').instance().state.text).toStrictEqual('[lorem](url)');
    });
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
        contentItem: dummyContentItem,
        multiline: false,
        maxLength: undefined,
        initialText: dummyNewText,
        initialIsActive: false,
        onSubmit: dummyFunctionProps.onSubmit,
        onDeactivate: dummyFunctionProps.onDeactivate,
        onRemove: dummyFunctionProps.onRemove,
        onIndent: dummyFunctionProps.onIndent,
        onUnindent: dummyFunctionProps.onUnindent,
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
        contentItem: dummyContentItem,
        multiline: false,
        maxLength: undefined,
        initialText: dummyText,
        initialIsActive: true,
        onSubmit: dummyFunctionProps.onSubmit,
        onDeactivate: dummyFunctionProps.onDeactivate,
        onRemove: dummyFunctionProps.onRemove,
        onIndent: dummyFunctionProps.onIndent,
        onUnindent: dummyFunctionProps.onUnindent,
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
        contentItem: dummyContentItem,
        multiline: false,
        maxLength: undefined,
        initialText: dummyText,
        initialIsActive: false,
        onSubmit: dummyFunctionProps.onSubmit,
        onDeactivate: dummyFunctionProps.onDeactivate,
        onRemove: dummyFunctionProps.onRemove,
        onIndent: dummyFunctionProps.onIndent,
        onUnindent: dummyFunctionProps.onUnindent,
      };
      const result = EditableTextContent.getDerivedStateFromProps(dummyNextProps, dummyPrevState);
      expect(result).toStrictEqual({});
    });

  });

});
