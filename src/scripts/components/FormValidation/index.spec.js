import _ from 'lodash';
import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import FormValidation from '.';
import FormGroup from '../FormGroup';

import schema from './validator/fixtures/test-shema';
import { extract } from '../../utilities/number';

describe('components/FormValidation: Component', () => {
    it('default renders without errors', () => {
        expect(shallow(<FormValidation />)).to.have.length(1);
    });

    it('call Form.onFormChange when change children ', () => {
        const wrapper = shallow(<FormValidation />);
        const component = wrapper.instance();
        const onFormChange = sinon.stub(component, 'onFormChange');

        component.onFormChange();
        expect(onFormChange.called).to.equal(true);
    });

    it('Form has initialized state.model', () => {
        expect(shallow(<FormValidation />).state('model')).to.eql({ data: {}, inputErrorsFields: {}, logicErrorsFields: {} });
        expect(shallow(<FormValidation schema={schema} />).state('model')).to.eql({
            data: { field1: undefined, field2: undefined, field3: undefined, field4: undefined },
            inputErrorsFields: { field1: [], field2: [], field3: [], field4: [] },
            logicErrorsFields: { field1: [], field2: [], field3: [], field4: [] }
        });
    });
});

const firstField = 'field1';
const numberString = '123';
const mixedString = '123crt';

const fieldHasLogic = 'field2';
const notValidNumberValue = 123;
const validNumberValue = 52;
const notValidLogicNumberValue = 123;


describe('components/FormValidation: Validation', () => {
    it('can work without schema ', () => {
        const wrapper = shallow(<FormValidation />);
        const component = wrapper.instance();

        component.onFormChange(firstField, mixedString);
        expect(wrapper.state('model')).to.eql({ data: { [firstField]: mixedString }, inputErrorsFields: { [firstField]: [] }, logicErrorsFields: { [firstField]: [] } });
    });

    it('can convert, validate input, logic validate by use schema ', () => {
        const wrapper = shallow(<FormValidation schema={schema} />);
        const component = wrapper.instance();


        component.onFormChange(firstField, mixedString);
        expect(wrapper.state('model').data[firstField]).to.equal(undefined);
        expect(wrapper.state('model').inputErrorsFields[firstField]).to.eql([schema[firstField].type.msg]);
        expect(wrapper.state('model').logicErrorsFields[firstField]).to.eql([]);

        component.onFormChange(firstField, notValidNumberValue);
        expect(wrapper.state('model').data[firstField]).to.equal(extract(notValidNumberValue));
        expect(wrapper.state('model').inputErrorsFields[firstField]).to.eql([schema[firstField].inputRules[1].msg]);
        expect(wrapper.state('model').logicErrorsFields[firstField]).to.eql([]);

        component.onFormChange(firstField, validNumberValue);
        component.onFormChange(fieldHasLogic, notValidLogicNumberValue);
        expect(wrapper.state('model').data[firstField]).to.equal(extract(validNumberValue));
        expect(wrapper.state('model').data[fieldHasLogic]).to.equal(extract(notValidLogicNumberValue));
        expect(wrapper.state('model').inputErrorsFields[firstField]).to.eql([]);
        expect(wrapper.state('model').inputErrorsFields[fieldHasLogic]).to.eql([]);
        expect(wrapper.state('model').logicErrorsFields[firstField]).to.eql([]);
        expect(wrapper.state('model').logicErrorsFields[fieldHasLogic]).to.eql([schema[fieldHasLogic].logicRules[0].msg]);
    });
});

describe('components/FormValidation: set validation state and feedback text to children', () => {
    it('default renders without errors', () => {
        const wrapper = shallow(
            <FormValidation schema={schema}>
                <FormGroup name={firstField} isValidated={true} />
                <FormGroup name={fieldHasLogic} isValidated={true} />
            </FormValidation>);

        const component = wrapper.instance();

        expect(wrapper).to.have.length(1);
        expect(wrapper.props().schema).to.not.equal({});

        component.onFormChange(firstField, mixedString);
        expect(wrapper.childAt(0).props().validationState).to.equal('error');
        expect(wrapper.childAt(0).props().feedbackText).to.equal('Неверный формат данных. Разрешено только число.');

        component.onFormChange(firstField, validNumberValue);
        component.onFormChange(fieldHasLogic, notValidLogicNumberValue);
        expect(wrapper.childAt(0).props().validationState).to.equal('default');
        expect(wrapper.childAt(0).props().feedbackText).to.equal('');
        expect(wrapper.childAt(1).props().validationState).to.equal('error');
        expect(wrapper.childAt(1).props().feedbackText).to.equal('Знечения полей field1 и field2 должны быть равны');

        component.onFormChange(firstField, validNumberValue);
        component.onFormChange(fieldHasLogic, validNumberValue);
        expect(wrapper.childAt(0).props().validationState).to.equal('default');
        expect(wrapper.childAt(0).props().feedbackText).to.equal('');
        expect(wrapper.childAt(1).props().validationState).to.equal('default');
        expect(wrapper.childAt(1).props().feedbackText).to.equal('');
    });
});
