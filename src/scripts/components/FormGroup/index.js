// @flow

/*
 * Компонент- фабрика "строчки ввода" в форме
 * строчка ввода = заголовок + какой то тип инпута + вывод ошибки-подсказки
 * validationState - статусы раскрашивания в соответсвии с bootstrap4
 * feedbackText - текст подсказки, ошибки, и т.д.
 */

import * as React from 'react';
import classNames from 'classnames';

import Input from './_components/Input';
import Password from './_components/Password';

import type { validationStates } from '../FormValidation/validator/validator';

export const stateClasses: { [key: validationStates]: string } = { // CSS классы цветных статусов
    success: 'has-success',
    warning: 'has-warning',
    error: 'has-danger',
    info: 'has-info'
};

export type InputTypes = 'date' | 'suggest' | 'text' | 'input' | 'password';
export const Components: { [key: InputTypes]: React.createClass } = { // возможн компоненты ввода данных
    // date: null,
    // suggest: null,
    // text: null,
    password: Password,
    input: Input
};

type Props = {
    id?: string,
    type: InputTypes, // тип поля ввода, т.к. есть в defaultProps, Flow позволяет не передав
    name?: string,
    className?: string,
    options?: any,
    defaultValue?: any,
    onChange: Function,
    validationState?: validationStates, // css класс раскрашив поля ввода
    feedbackText?: string, // текст ошибки, подсказки, инфо и тд.
    onChange?: Function
};


// type State = {
//     value: string
// }

export class FormGroup extends React.Component<Props> {
    props: Props;
    // state: State;
    static defaultProps: Props = {
        id: '',
        type: 'input',
        name: '',
        className: '',
        options: null,
        defaultValue: null,
        validationState: 'default',
        feedbackText: '',
        onChange: () => {
        },
    };

    // constructor(props: any) {
    //     super(props);
    // this.state = {
    //     value: props.defaultValue
    // };
    // }

    onChange = ({ target }: SyntheticInputEvent<*>) => {
        this.props.onChange && this.props.onChange(this.props.name, target.value);
        // this.setState({ value: target.value });
    };

    // getValue() {
    //     return this.state.value;
    // }

    render(): React.Element<any> {
        const { id, type, name, defaultValue, validationState, feedbackText } = this.props;

        const validationStateClass: string = (validationState && stateClasses[validationState]) || '';

        const Comp: React.createClass = Components[type];
        if (Comp === undefined)
            throw new Error('FormGroup need known type from type "InputTypes"');

        return (
            <div className={classNames('form-group', 'row', validationStateClass)}>
                <label htmlFor={id} className="col-sm-2 col-form-label">Email address</label>
                <div className="col-sm-10">

                    { Comp && <Comp id={id} name={name} defaultValue={defaultValue} placeholder="Placeholder..." onChange={this.onChange} /> }

                    <div className="form-control-feedback">{feedbackText}</div>
                    <small className="form-text text-muted">We will never share your email with anyone else.</small>
                </div>
            </div>
        );
    }
}

export default FormGroup;