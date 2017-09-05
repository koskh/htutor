// import _ from 'lodash';
import { expect } from 'chai';

import { convertField, validateRules } from './validator';

import schema from './fixtures/test-shema';

const firstField = 'field1';
const emptyString = '';
const numberString = '123';
const mixedString = '123crt';

const notValidNumberValue = 123;
const validNumberValue = 52;

const fieldWithoutType = 'field2';
const fieldHasLogic = 'field2';
const notSchemeField = 'abrakadabra';

const fieldWithoutAllRules = 'field3';
const fieldWithHavyLogic = 'field4';
const notValidModel = { field1: 56, field2: 59, field3: 1, field4: 2 };
const validModel = { field1: 56, field2: 56, field3: 56, field4: 56 };


describe('components/FormValidation/Validator: ConvertField', () => {
    it('can\'t work without schema', () => {
        expect(() => convertField()).to.throw();
        expect(() => convertField(firstField, mixedString)).to.throw();
    });

    it('default returns not converted value in result tobject', () => {
        expect(convertField(firstField, mixedString, {})).to.eql({ result: mixedString, errors: [] });
    });

    it('empty string not converted', () => {
        expect(convertField(firstField, emptyString, schema)).to.eql({ result: emptyString, errors: [] });
    });

    it('undefined not converted and returm error', () => {
        expect(convertField(firstField, undefined, schema)).to.eql({ result: undefined, errors: [schema[firstField].type.msg] });
    });

    it('can converts by schema.type.convert', () => {
        expect(convertField(firstField, numberString, schema)).to.eql({ result: 123, errors: [] });
    });

    it('If can\'t converts by schema.type.convert return {result: undefined, errors:[...]}', () => {
        expect(convertField(firstField, mixedString, schema)).to.eql({ result: undefined, errors: [schema[firstField].type.msg] });
    });

    it('not converted if hasn\'t type for field', () => {
        expect(convertField(fieldWithoutType, mixedString, schema)).to.eql({ result: mixedString, errors: [] });
    });

    it('not converted if hasn\'t field in scheme', () => {
        expect(convertField(notSchemeField, mixedString, schema)).to.eql({ result: mixedString, errors: [] });
    });
});


describe('components/FormValidation/Validator: validateInputRules', () => {
    it('not validate if hasn\'t field in scheme', () => {
        expect(validateRules(notSchemeField, { [notSchemeField]: notValidNumberValue }, 'inputRules', schema)).to.eql({ result: true, errors: [] });
    });

    it('not validate if hasn\'t inputRules for field', () => {
        expect(validateRules(fieldWithoutType, { [fieldWithoutType]: notValidNumberValue }, 'inputRules', schema)).to.eql({ result: true, errors: [] });
    });


    it('validate value by scheme', () => {
        expect(validateRules(firstField, { [firstField]: emptyString }, 'inputRules', schema).result).to.equal(false);
        expect(validateRules(firstField, { [firstField]: emptyString }, 'inputRules', schema).errors.length).not.equal(0);

        expect(validateRules(firstField, { [firstField]: emptyString }, 'inputRules', schema)).to.eql({ result: false, errors: [schema[firstField].inputRules[0].msg] });
        expect(validateRules(firstField, { [firstField]: notValidNumberValue }, 'inputRules', schema)).to.eql({ result: false, errors: [schema[firstField].inputRules[1].msg] });
        expect(validateRules(firstField, { [firstField]: validNumberValue }, 'inputRules', schema)).to.eql({ result: true, errors: [] });
    });
});

describe('components/FormValidation/Validator: validateLogicRules', () => {
    it('not validate if hasn\'t field in scheme', () => {
        expect(validateRules(notSchemeField, { [notSchemeField]: notValidNumberValue }, 'logicRules', schema)).to.eql({ result: true, errors: [] });
    });

    it('not validate if hasn\'t inputRules for field', () => {
        expect(validateRules(fieldWithoutAllRules, { [fieldWithoutAllRules]: notValidNumberValue }, 'logicRules', schema)).to.eql({ result: true, errors: [] });
    });

    it('Model is valid by input, but its invalidate by logic', () => {
        expect(validateRules(firstField, validModel, 'logicRules', schema)).to.eql({ result: true, errors: [] });
        expect(validateRules(fieldHasLogic, notValidModel, 'logicRules', schema)).to.eql({ result: false, errors: [schema[fieldHasLogic].logicRules[0].msg] });
        expect(validateRules(fieldWithoutAllRules, validModel, 'logicRules', schema)).to.eql({ result: true, errors: [] });
    });

    it('validate all attributes in not valid model by scheme and return logic error', () => {
        expect(validateRules(fieldWithHavyLogic, notValidModel, 'logicRules', schema).result).to.equal(false);
        expect(validateRules(fieldWithHavyLogic, notValidModel, 'logicRules', schema).errors.length).not.equal(0);

        expect(validateRules(fieldWithHavyLogic, notValidModel, 'logicRules', schema)).to.eql({
            result: false,
            errors: [
                schema[fieldWithHavyLogic].logicRules[0].msg
            ] });
    });

    it('validate all attributes in valid model by scheme ', () => {
        expect(validateRules(firstField, validModel, 'logicRules', schema)).to.eql({ result: true, errors: [] });
        expect(validateRules(fieldHasLogic, validModel, 'logicRules', schema)).to.eql({ result: true, errors: [] });
        expect(validateRules(fieldWithoutAllRules, validModel, 'logicRules', schema)).to.eql({ result: true, errors: [] });
        expect(validateRules(fieldHasLogic, validModel, 'logicRules', schema)).to.eql({ result: true, errors: [] });
    });
});

// describe('components/FormValidation/Validator: validateField', () => {
//     it('not validate if hasn\'t field in scheme', () => {
//         expect(validateRules(notSchemeField, { [notSchemeField]: notValidNumberValue }, 'logicRules', schema)).to.eql({ result: true, errors: [] });
//     });
//
// });
