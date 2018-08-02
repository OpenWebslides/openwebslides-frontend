// @flow

import { InvalidArgumentError } from 'errors';

import validate from '..';

describe(`validateStringProps`, (): void => {

  it(`returns an object equal to the passed propsObject, when all props are valid`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: 'value1',
      prop2: 'value2',
      nullableProp1: 'value3',
      nullableProp2: 'value4',
    };
    const resultPropsObject = validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject);

    expect(resultPropsObject).toEqual(dummyPropsObject);
  });

  it(`trims all string props, when trim is TRUE`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: '   value1   ',
      prop2: '   value2',
      nullableProp1: 'value3   ',
      nullableProp2: 'value4',
    };
    const expectedPropsObject = {
      prop1: 'value1',
      prop2: 'value2',
      nullableProp1: 'value3',
      nullableProp2: 'value4',
    };
    const resultPropsObject = validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject, true);

    expect(resultPropsObject).toEqual(expectedPropsObject);
  });

  it(`does not trim string props, when trim is FALSE`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: '   value1   ',
      prop2: '   value2',
      nullableProp1: 'value3   ',
      nullableProp2: 'value4',
    };
    const resultPropsObject = validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject, false);

    expect(resultPropsObject).toEqual(dummyPropsObject);
  });

  it(`converts all string props that are empty after trimming to NULL`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: 'value1',
      prop2: 'value2',
      nullableProp1: '  ',
      nullableProp2: '',
    };
    const expectedPropsObject = {
      prop1: 'value1',
      prop2: 'value2',
      nullableProp1: null,
      nullableProp2: null,
    };
    const resultPropsObject = validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject, true);

    expect(resultPropsObject).toEqual(expectedPropsObject);
  });

  it(`throws an InvalidArgumentError, when a non-nullable string prop is NULL after conversion`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: '   ',
      prop2: 'value2',
      nullableProp1: 'value3',
      nullableProp2: 'value4',
    };
    expect((): void => {
      validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject, true);
    }).toThrow(InvalidArgumentError);
  });

  it(`allows values for which the keys aren't included in stringKeys or nullableStringKeys to pass through unchanged`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: 'value1',
      prop2: 'value2',
      nullableProp1: 'value3',
      nullableProp2: 'value4',
      nonStringProp1: true,
      nonStringProp2: 3,
    };
    const resultPropsObject = validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject);

    expect(resultPropsObject).toEqual(dummyPropsObject);
  });

  it(`does not mutate the propsObject`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: '   value1   ',
      prop2: '   value2',
      nullableProp1: 'value3   ',
      nullableProp2: 'value4',
    };
    const dummyPropsObjectCopy = { ...dummyPropsObject };
    const resultPropsObject = validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject, true);

    expect(resultPropsObject).not.toBe(dummyPropsObject);
    expect(dummyPropsObject).toEqual(dummyPropsObjectCopy);
  });

  it(`throws an InvalidArgumentError, when one of the stringKeys is not present in the propsObject`, (): void => {
    const dummyStringKeys = ['prop1', 'invalidProp'];
    const dummyNullableStringKeys = ['nullableProp1', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: 'value1',
      prop2: 'value2',
      nullableProp1: 'value3',
      nullableProp2: 'value4',
    };
    expect((): void => {
      validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject);
    }).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when one of the nullableStringKeys is not present in the propsObject`, (): void => {
    const dummyStringKeys = ['prop1', 'prop2'];
    const dummyNullableStringKeys = ['invalidProp', 'nullableProp2'];
    const dummyPropsObject = {
      prop1: 'value1',
      prop2: 'value2',
      nullableProp1: 'value3',
      nullableProp2: 'value4',
    };
    expect((): void => {
      validate.stringProps(dummyStringKeys, dummyNullableStringKeys, dummyPropsObject);
    }).toThrow(InvalidArgumentError);
  });

});
