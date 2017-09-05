// @flow
import * as React from 'react';

import DefaultIndicator from './_components/Indicator';
// import Indicator from '../Indicators/Spiner';

import styles from './index.pcss';

type Props = {
    pending: boolean,
    className?: string,
    message?: string,
    Indicator?: React.createElement,
    children?: React.Node
}

type DefaultProps = {
    className: string,
    message: string,
    Indicator: React.createElement,
    children: React.Node
}

const defaultProps: DefaultProps = {
    className: '',
    message: '',
    Indicator: DefaultIndicator,
    children: null
};


const PendingIndicator = (props: Props): React.Element<any> => {
    const { pending, className, children, message, Indicator } = props;

    if (typeof Indicator !== 'function')
        throw new Error('PendingIndicator need Indicator:ReactClass');

    /* eslint-disable no-nested-ternary */
    return (
        <div className={styles.root}>
            {pending ? <Indicator className={className} /> : (message || children)}
        </div>
    );
    /* eslint-enable no-nested-ternary */
};

PendingIndicator.defaultProps = defaultProps;

export default PendingIndicator;

