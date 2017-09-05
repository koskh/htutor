// @flow
import * as React from 'react';
import cn from 'classnames';


import {FormGroup, stateClasses} from '../../../../../components/FormGroup';


class CustomFormGroup extends FormGroup {
    render(): React.Element<any> {
        const { id, type, name, defaultValue, className, validationState } = this.props;

        const validationStateClass: string = (validationState && stateClasses[validationState]) || '';

        return (
            <div className={cn('form-group', 'mb-0', validationStateClass)}>
                <label htmlFor={id} className="sr-only">Email address</label>
                <input id={id} name={name} type={type} className={cn('form-control', className)} defaultValue={defaultValue} onChange={this.onChange} />
            </div>
        );
    }
}

export default CustomFormGroup;

