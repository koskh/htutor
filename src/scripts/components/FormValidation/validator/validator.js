// @flow

/* Валидатор.
*  Получает на вход имя поля, значение, валидирует по переданной схеме.
*/
import _ from 'lodash';

import type { Schema } from './schema';
import type { FormModel } from '../';

export type validationStates = 'success' | 'warning' | 'error' | 'info' | 'default';

export type ValidatorResultObject = { result: any, errors: Array<string> };

// конвертация поля
export function convertField(nameField: string, valueField: any, schema: Schema): ValidatorResultObject {
    //eslint-disable-next-line
    let result = valueField;
    let errors = [];

    if (schema === undefined)
        throw new Error('Validator.convertField need schema');

    if (schema[nameField] && schema[nameField].type) {
        const type = schema[nameField].type;

        if (valueField === undefined) {
            result = undefined;
            errors = [type.msg];
        }

        if (valueField !== '') {
            const convertedValue = schema[nameField].type.convert(valueField);
            if (convertedValue === undefined || (typeof convertedValue === 'number' && isNaN(convertedValue))) {
                result = undefined;
                errors = [type.msg];
            } else
                result = convertedValue;
        }
    }

    return { result, errors };
}

// валидация  полей
export function validateRules(nameField: string, attributes: any, type: 'inputRules' | 'logicRules', schema: Schema): ValidatorResultObject {
    let result = true;
    const errors = [];

    if (schema === undefined)
        throw new Error('Validator.validateLogicRules need schema');

    if (schema[nameField] && schema[nameField][type]) {
        const rules = schema[nameField][type];
        for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];
            if (!rule.validate(attributes)) {
                result = false;
                errors.push(rule.msg);
                break;
            }
        }
    }

    return { result, errors };
}

//
export function getValidationState(nameField: string, formModel: FormModel): validationStates {
    if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
        return 'error';

    if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
        return 'error';

    return 'default';
}

export function getFeedbackText(nameField: string, formModel: FormModel): string {
    if (formModel.inputErrorsFields[nameField] && formModel.inputErrorsFields[nameField].length > 0)
        return formModel.inputErrorsFields[nameField].join(',');

    if (formModel.logicErrorsFields[nameField] && formModel.logicErrorsFields[nameField].length > 0)
        return formModel.logicErrorsFields[nameField].join(',');

    return '';
}

export function validateField(nameField: string, valueField: any, formModel: FormModel, schema: Schema): FormModel {
    let { data, inputErrorsFields, logicErrorsFields } = _.cloneDeep(formModel); // текущ сосстояние модели формы

    const converted: ValidatorResultObject = convertField(nameField, valueField, schema); // конверт значения в нужн формат
    data = { ...data, [nameField]: converted.result };
    inputErrorsFields = { ...inputErrorsFields, [nameField]: converted.errors };

    if (converted.errors.length === 0) { // удачно сконвертили и получили значение
        // валидир введен данные
        const inputValidated: ValidatorResultObject = validateRules(nameField, data, 'inputRules', schema);
        inputErrorsFields = { ...inputErrorsFields, [nameField]: inputValidated.errors };

        // валидац созависим полей, если все поля заполнены без ошибок
        if (_.every(inputErrorsFields, val => {
            return val.length === 0;
        })) {
            _.each(data, (valueFld, nameFld) => {
                const logicValidated: ValidatorResultObject = validateRules(nameFld, data, 'logicRules', schema);
                logicErrorsFields = { ...logicErrorsFields, [nameFld]: logicValidated.errors };
            });
        } else
            logicErrorsFields[nameField] = []; // приоритет ошибок у невалидного заполнения
    }

    return { data, inputErrorsFields, logicErrorsFields };
}

export function isValid(formModel: FormModel, schema: Schema): boolean { // прогоняем все правила на текущих данных модели, вовзращаем ее валидность.
    let valid = true;

    _.forEach(schema, (v, k) => {
        if (!valid || !((convertField(k, formModel.data[k], schema)).result !== undefined && (validateRules(k, formModel.data, 'inputRules', schema)).result && (validateRules(k, formModel.data, 'logicRules', schema)).result))
            valid = false;
    });

    return valid;
}

export function validateModel(formModel: FormModel, schema: Schema): FormModel {
    let model: FormModel = _.cloneDeep(formModel);

    _.forEach(schema, (v, k) => { // должны убедиться, что значения вообще обрабатываемые ( например, модель заполнена третьей стороной)
        const converted: ValidatorResultObject = convertField(k, model.data[k], schema);
        model.data = { ...model.data, [k]: converted.result };
        model.inputErrorsFields = { ...model.inputErrorsFields, [k]: converted.errors };
    });

    _.forEach(schema, (v, k) => {
        model = validateField(k, model.data[k], model, schema);
    });

    return model;
}
