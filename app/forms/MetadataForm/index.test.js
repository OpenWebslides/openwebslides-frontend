// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';
import { type DropdownValue } from 'types/forms';
import topics from 'modules/topics';

import MetadataForm, { PureMetadataForm, type MetadataFormValues } from '.';

describe(`MetadataForm`, (): void => {

  let dummyFormProps: MetadataFormValues;
  let dummyAvailableAccess: $ReadOnlyArray<DropdownValue>;
  let dummyOnSubmit: any;
  let dummyOnCancel: any;

  beforeEach((): void => {
    dummyFormProps = {
      title: 'dummyTitle',
      description: 'dummyDescription',
      access: topics.model.accessTypes.PUBLIC,
    };
    dummyAvailableAccess = [
      { key: topics.model.accessTypes.PUBLIC, value: topics.model.accessTypes.PUBLIC, text: 'Public' },
      { key: topics.model.accessTypes.PROTECTED, value: topics.model.accessTypes.PROTECTED, text: 'Protected' },
      { key: topics.model.accessTypes.PRIVATE, value: topics.model.accessTypes.PRIVATE, text: 'Private' },
    ];
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureMetadataForm />,
    );
    expect(enzymeWrapper.isEmptyRender()).toStrictEqual(false);
  });

  it(`renders a dropdown box with the passed available access`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <MetadataForm
          access={dummyFormProps.access}
          availableAccess={dummyAvailableAccess}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('DropdownItem')).toHaveLength(3);
    expect(enzymeWrapper.find(`DropdownItem[value="${topics.model.accessTypes.PUBLIC}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`DropdownItem[value="${topics.model.accessTypes.PROTECTED}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`DropdownItem[value="${topics.model.accessTypes.PRIVATE}"]`)).toHaveLength(1);
  });

  it(`calls the passed onCancel callback when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <MetadataForm
          title={dummyFormProps.title}
          description={dummyFormProps.description}
          access={dummyFormProps.access}
          availableAccess={dummyAvailableAccess}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="topic-metadata-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalledTimes(1);
    expect(dummyOnCancel).toHaveBeenCalledWith();
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(
      <PureMetadataForm availableAccess={dummyAvailableAccess} />,
    );
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    // Title of length 101
    const tooLongTitle = new Array(102).join('X');

    // Description of length 201
    const tooLongDescription = new Array(202).join('X');

    expect(validate({ ...dummyFormProps, title: '' })).toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: 'abcd' })).not.toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: tooLongTitle })).toHaveProperty('title');

    expect(validate({ ...dummyFormProps, description: '' })).not.toHaveProperty('description');
    expect(validate({ ...dummyFormProps, description: tooLongDescription })).toHaveProperty('description');

    expect(validate({ ...dummyFormProps, access: topics.model.accessTypes.PUBLIC })).not.toHaveProperty('access');
    expect(validate({ ...dummyFormProps, access: 'foo' })).toHaveProperty('access');
  });

});
