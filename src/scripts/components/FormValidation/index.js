// @flow

import _ from 'lodash';
import * as React from 'react';
// import classNames from 'classnames';

import FormStateFeedback from './_components/FormStateFeedback';
import * as validator from './validator/validator';

import type { ValidatorResultObject, validationStates } from './validator/validator';
import type { Schema } from './validator/schema';


export type DataFields = { [key: string]: any }; // значения полей формы
export type ErrorsFields = { [key: string]: Array<string> }; // ошибки формы

export type FormModel = { // содержимое валидационной формы
    data: DataFields, // данные полей
    inputErrorsFields: ErrorsFields, // ошибки ввода
    logicErrorsFields: ErrorsFields // ошибки зависимых полей
}

type Props = {
    id: string,
    className: string,
    schema: Schema,
    onChange: Function,
    children: React.Node
};

type State = {
    model: FormModel
};


class FormValidation extends React.Component<Props, State> {
    props: Props;
    state: State;

    static defaultProps: Props = {
        id: '',
        className: '',
        schema: {},
        onChange: () => {},
        children: null
    };

    constructor(props: any) {
        super(props);

        const model: FormModel = this._initializeFormModel(this.props.schema);
        this.state = { model };
    }

    _initializeFormModel = (schema: Schema): FormModel => {
        const result = {
            data: {},
            inputErrorsFields: {},
            logicErrorsFields: {},
        };

        _.each(schema, (v, k) => {
            result.data[k] = undefined;
            result.inputErrorsFields[k] = [];
            result.logicErrorsFields[k] = [];
        });

        return result;
    };

    onFormChange = (nameField: string, valueField: any) => {
        const schema = this.props.schema;

        const { data, inputErrorsFields, logicErrorsFields } = validator.validateField(nameField, valueField, this.state.model, schema);

        this.setState({ model: { data, inputErrorsFields, logicErrorsFields } }, () => {
            this.props.onChange && this.props.onChange(this.state.model, validator.isValid(this.state.model, schema)); // уведомление родительской формы
        });
    };

    showFormErrors(): void { // раскрашив всех ошибок формы
        const validatedModel = validator.validateModel(this.state.model, this.props.schema);
        this.setState({ model: validatedModel });
    }

    isValid(): boolean {
        this.showFormErrors();
        return validator.isValid(this.state.model, this.props.schema);
    }

    _renderChildren(props: any) {
        return React.Children.map(props.children, child => {
            const id = child.props.id || _.uniqueId('frm-vldtn_');

            const name: string = child.props.name;
            const model = this.state.model;

            const modelValue = model.data[name];
            const defaultValue = child.props.defaultValue;

            if (!_.isNil(name) && _.isNil(modelValue) && !_.isNil(defaultValue)) // заполняем модель формы внешними данными
                model.data[name] = defaultValue;

            if (child.props.isValidated) {
                const validationState: validationStates = validator.getValidationState(name, model);
                const feedbackText: string = validator.getFeedbackText(name, model);

                return React.cloneElement(child, { id, onChange: this.onFormChange, validationState, feedbackText });
            }

            return child;
        });
    }

    render() {
        return (
            <form id={this.props.id} className={this.props.className} autoComplete="off">

                {this._renderChildren(this.props)}

                <FormStateFeedback formModel={this.state.model} />
            </form>
        );
    }
}

export default FormValidation;

