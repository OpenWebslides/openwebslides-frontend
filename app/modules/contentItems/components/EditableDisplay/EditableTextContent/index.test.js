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
  let dummyHandleEdit: any;

  let dummyEvent: any;

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
    dummyHandleEdit = jest.fn();

    dummyEvent = { preventDefault: jest.fn() };

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

  it(`renders a markdown toolbar when markdown is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={true} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="editable-text-content__markdown-toolbar"]')).not.toHaveLength(0);
  });

  it(`does not render a markdown toolbar when markdown is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={false} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="editable-text-content__markdown-toolbar"]')).toHaveLength(0);
  });

  it(`rerenders itself with the ghost div height, when it is in multiline mode and receives a change event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} multiline={true} />
      </DummyProviders>,
    );

    const dummyHeight = 999;

    (enzymeWrapper.find('EditableTextContent').instance(): any).ghostRef = { clientHeight: dummyHeight };
    enzymeWrapper.find(inputSelector).hostNodes().simulate('change');

    enzymeWrapper.update();
    expect((enzymeWrapper.find('EditableTextContent').instance(): any).state.height).toStrictEqual(dummyHeight);
    expect(enzymeWrapper.find(inputSelector).hostNodes().props().style.minHeight).toStrictEqual(dummyHeight);
  });

  it(`rerenders itself with the ghost div height, when it is in multiline mode and receives a focus event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} multiline={true} />
      </DummyProviders>,
    );

    const dummyHeight = 999;

    (enzymeWrapper.find('EditableTextContent').instance(): any).ghostRef = { clientHeight: dummyHeight };
    enzymeWrapper.find(inputSelector).hostNodes().simulate('focus');

    enzymeWrapper.update();
    expect((enzymeWrapper.find('EditableTextContent').instance(): any).state.height).toStrictEqual(dummyHeight);
    expect(enzymeWrapper.find(inputSelector).hostNodes().props().style.minHeight).toStrictEqual(dummyHeight);
  });

  // Necessary test to check when ghostRef is null for full coverage
  it(`does nothing, when ghostRef is null and handleChange is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} multiline={true} />
      </DummyProviders>,
    );

    const height = (enzymeWrapper.find('EditableTextContent').instance(): any).state.height;

    (enzymeWrapper.find('EditableTextContent').instance(): any).handleChange();

    enzymeWrapper.update();
    expect((enzymeWrapper.find('EditableTextContent').instance(): any).state.height).toStrictEqual(height);
  });

  it(`rerenders itself, when it receives an input event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );

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

    expect(enzymeWrapper.find(inputSelector).hostNodes().props().maxLength).toStrictEqual(20);
  });

  it(`renders itself without a maxLength, if one was not defined`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(inputSelector).hostNodes().props().maxLength).toBeUndefined();
  });

  it(`calls the passed onSubmit and onDeactivate functions with the correct arguments, when it receives a blur event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    enzymeWrapper.find(inputSelector).hostNodes().simulate('blur');

    expect(dummyFunctionProps.onSubmit).toHaveBeenCalledWith(dummyText);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledWith(false);
  });

  it(`calls the passed onSubmit and onDeactivate functions, when the ENTER key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    (enzymeWrapper.find('EditableTextContent').instance(): any).setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('enter', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyFunctionProps.onSubmit).toHaveBeenCalledWith(`${dummyText}${dummyText}`);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledWith(true);
  });

  it(`calls the passed onDeactivate function when the ESC key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    (enzymeWrapper.find('EditableTextContent').instance(): any).setState({ text: `${dummyText}${dummyText}` });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('esc', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledWith(false);
  });

  it(`calls the passed onRemove function when the text value is empty and the BACKSPACE key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
    (enzymeWrapper.find('EditableTextContent').instance(): any).setState({ text: '' });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the handleKeyEvent callback by simulating keyboard events
    (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('backspace', dummyEvent);

    expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(dummyFunctionProps.onRemove).toHaveBeenCalledTimes(1);
  });

  it(`does not call the passed onRemove function when the text value is not empty and the BACKSPACE key is pressed`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
      </DummyProviders>,
    );
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

    // Necessary test to check when fieldRef is null for full coverage
    it(`does nothing when fieldRef is null and handleChange is called`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} />
        </DummyProviders>,
      );

      const prevState = { ...(enzymeWrapper.find('EditableTextContent').instance(): any).state };

      // Set fieldRef to null
      (enzymeWrapper.find('EditableTextContent').instance(): any).fieldRef = null;

      (enzymeWrapper.find('EditableTextContent').instance(): any).handleEdit(m.markdownTypes.STRONG);

      // Text was not changed
      expect(prevState).toStrictEqual((enzymeWrapper.find('EditableTextContent').instance(): any).state);
    });

    it(`maps the STRONG markdownType argument to the correct affixes`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText="lorem" />
        </DummyProviders>,
      );

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

      // Set selection to 'ipsum'
      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      enzymeWrapper.find(inputSelector).hostNodes().instance().setSelectionRange(0, 5);

      enzymeWrapper.find('PureMarkdownToolbar').props().onEdit(m.markdownTypes.LINK);

      // $FlowFixMe ignore warning for 'missing in undefined' as it would throw an error anyway
      expect(enzymeWrapper.find('EditableTextContent').instance().state.text).toStrictEqual('[lorem](url)');
    });

  });

  describe(`keyboard events`, (): void => {

    it(`calls the handleEdit function with the correct arguments when the CTRL+B key is pressed and markdown is TRUE`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={true} />
        </DummyProviders>,
      );

      // Mock handleEdit function
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleEdit = dummyHandleEdit;

      // Enzyme does not support event propagation yet, so we cannot test out
      // the handleKeyEvent callback by simulating keyboard events
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('ctrl+b', dummyEvent);

      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(dummyHandleEdit).toHaveBeenCalledWith(m.markdownTypes.STRONG);
    });

    it(`does not call the handleEdit function when the CTRL+B key is pressed and markdown is FALSE`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={false} />
        </DummyProviders>,
      );

      // Mock handleEdit function
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleEdit = dummyHandleEdit;

      // Enzyme does not support event propagation yet, so we cannot test out
      // the handleKeyEvent callback by simulating keyboard events
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('ctrl+b', dummyEvent);

      expect(dummyHandleEdit).not.toHaveBeenCalled();
    });

    it(`calls the handleEdit function with the correct arguments when the CTRL+I key is pressed and markdown is TRUE`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={true} />
        </DummyProviders>,
      );

      // Mock handleEdit function
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleEdit = dummyHandleEdit;

      // Enzyme does not support event propagation yet, so we cannot test out
      // the handleKeyEvent callback by simulating keyboard events
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('ctrl+i', dummyEvent);

      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(dummyHandleEdit).toHaveBeenCalledWith(m.markdownTypes.EMPHASIS);
    });

    it(`does not call the handleEdit function when the CTRL+I key is pressed and markdown is FALSE`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={false} />
        </DummyProviders>,
      );

      // Mock handleEdit function
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleEdit = dummyHandleEdit;

      // Enzyme does not support event propagation yet, so we cannot test out
      // the handleKeyEvent callback by simulating keyboard events
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('ctrl+i', dummyEvent);

      expect(dummyHandleEdit).not.toHaveBeenCalled();
    });

    it(`calls the handleEdit function with the correct arguments when the CTRL+K key is pressed and markdown is TRUE`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={true} />
        </DummyProviders>,
      );

      // Mock handleEdit function
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleEdit = dummyHandleEdit;

      // Enzyme does not support event propagation yet, so we cannot test out
      // the handleKeyEvent callback by simulating keyboard events
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('ctrl+k', dummyEvent);

      expect(dummyEvent.preventDefault).toHaveBeenCalledTimes(1);
      expect(dummyHandleEdit).toHaveBeenCalledWith(m.markdownTypes.LINK);
    });

    it(`does not call the handleEdit function when the CTRL+K key is pressed and markdown is FALSE`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders>
          <EditableTextContent contentItem={dummyContentItem} {...dummyFunctionProps} initialText={dummyText} markdown={false} />
        </DummyProviders>,
      );

      // Mock handleEdit function
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleEdit = dummyHandleEdit;

      // Enzyme does not support event propagation yet, so we cannot test out
      // the handleKeyEvent callback by simulating keyboard events
      (enzymeWrapper.find('EditableTextContent').instance(): any).handleKeyEvent('ctrl+k', dummyEvent);

      expect(dummyHandleEdit).not.toHaveBeenCalled();
    });

  });

  describe(`getDerivedStateFromProps`, (): void => {

    it(`returns an object containing the new text and initialText, when the new initialText prop is different from the previous one`, (): void => {
      const dummyNewText = `${dummyText}${dummyText}`;
      const dummyPrevState = {
        initialText: dummyText,
        text: dummyText,
        height: 0,
      };
      const dummyNextProps = {
        contentItem: dummyContentItem,
        multiline: false,
        markdown: true,
        maxLength: undefined,
        initialText: dummyNewText,
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
        initialText: dummyText,
        text: dummyText,
        height: 0,
      };
      const dummyNextProps = {
        contentItem: dummyContentItem,
        multiline: false,
        markdown: true,
        maxLength: undefined,
        initialText: dummyText,
        onSubmit: dummyFunctionProps.onSubmit,
        onDeactivate: dummyFunctionProps.onDeactivate,
        onRemove: dummyFunctionProps.onRemove,
        onIndent: dummyFunctionProps.onIndent,
        onUnindent: dummyFunctionProps.onUnindent,
      };
      const result = EditableTextContent.getDerivedStateFromProps(dummyNextProps, dummyPrevState);
      expect(result).toStrictEqual({});
    });

    it(`returns an empty object, when the new initialText prop is the same as the previous one and the new intitialIsActive prop is the same as the previous one`, (): void => {
      const dummyPrevState = {
        initialText: dummyText,
        text: dummyText,
        height: 0,
      };
      const dummyNextProps = {
        contentItem: dummyContentItem,
        multiline: false,
        markdown: true,
        maxLength: undefined,
        initialText: dummyText,
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
