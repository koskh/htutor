// @flow
import * as React from 'react';
// import cn from 'classnames';

import FormValidation from '../../../../components/FormValidation';
import SchemaValidation from './_schema';

// import FormGroup from '../../../../components/FormGroup';
import CustomFormGroup from './_components/CustomFormGroup';


import styles from './index.pcss';

import { stateClasses } from '../../../FormGroup';

type Props = {
    // id?: string,
    // name?: ?string,
    // options?: any,
    // defaultValue?: any,
    // onChange: Function,
    // // validationState?: ?validationStates, // css класс раскрашив поля ввода
    // // feedbackText?: ?string, // текст ошибки, подсказки, инфо и тд.
    // onChange?: Function
    // children?: React.Children
};


class EmailPassword extends React.Component<Props> {
    props: Props;
    // // state: State;
    // static defaultProps: Props = {
    //     id: '',
    //     name: null,
    //     options: null,
    //     defaultValue: null,
    //     // validationState: null,
    //     feedbackText: null,
    //     onChange: () => {
    //     },
    // };

    // constructor(props: any) {
    //     super(props);
    // this.state = {
    //     value: props.defaultValue
    // };
    // }

    // onChange = ({ target }: SyntheticInputEvent<*>) => {
    //     this.setState((prevState, props) => {
    //         const value = prevState.value;
    //         value[target.name] = target.value;
    //         return { value };
    //     },
    //     () => { // логика уведомления родительской формы
    //         this.props.onChange && this.props.onChange(this.props.name, this.state.value);
    //     });
    // };

    // getValue() {
    //     return this.state.value;
    // }

    render(): React.Element<any> {
        // const { id, name, defaultValue, validationState, feedbackText } = this.props;

        // const validationStateClass: string = (validationState && stateClasses[validationState]) || '';

        return (
            <FormValidation schema={SchemaValidation}>

                <CustomFormGroup className={`${styles.text}`} isValidated={true} type="input" name="email" />
                <CustomFormGroup className={`${styles.password}`} isValidated={true} type="password" name="password" />

            </FormValidation>

        );
    }
}

export default EmailPassword;

