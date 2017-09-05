// @flow

import * as React from 'react';
import cn from 'classnames';

import styles from './index.pcss';

//eslint-disable-next-line

type Props = {
    className?: string
}

const defaultProps: Props = {
    className: ''
};


const Spinner = (props: Props) => {
    return (
        <div className={cn(styles.spinner, props.className)} />
    );
};

Spinner.defaultProps = defaultProps;


export default Spinner;

