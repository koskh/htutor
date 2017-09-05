// @flow

import * as React from 'react';
import classNames from 'classnames';

type Props = {
    id?: string,
    name?: string,
    className?: string,
    placeholder?: string,
    defaultValue?: string,
    onChange: Function
};


class Input extends React.Component<Props> {
    props: Props;

    static defaultProps: Props = {
        id: '',
        name: '',
        className: '',
        placeholder: '',
        defaultValue: '',
        onChange: () => {
        },
    };

    render(): React.Element<*> {
        const { id, className, name, defaultValue, placeholder, onChange } = this.props;

        return (
            <input type="password" id={id} name={name} className={classNames('form-control', className)} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} />
        );
    }
}

export default Input;
