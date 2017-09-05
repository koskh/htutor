// @flow

import _ from 'lodash';
import * as React from 'react';
import cn from 'classnames';
// import styles from './index.pcss';

import type { FormModel } from '../';

type Props = {
    formModel: FormModel,
    className?: string
}
//
const defaultProps: {className: string} = {
    className: ''
};


const getFormErrors = (formModel): string => { // переопределить, если нужно выводить name полей
    const feedbackText = [];
    //
    _.each(formModel.inputErrorsFields, (v, k) => {
        if (v.length > 0)
            feedbackText.push(v.join(','));
    });
    _.each(formModel.logicErrorsFields, (v, k) => {
        if (v.length > 0)
            feedbackText.push(v.join(','));
    });

    return feedbackText.length > 0 ? feedbackText.join(', ') : '';
};

const FormStateFeedback = (props: Props) => {
    const feedbackText: string = getFormErrors(props.formModel);

    return (
        <div className={cn('form-group has-danger', props.className)}>
            <div className="form-control-feedback">{feedbackText}</div>
        </div>
    );
};

FormStateFeedback.defaultProps = defaultProps;

export default FormStateFeedback;

