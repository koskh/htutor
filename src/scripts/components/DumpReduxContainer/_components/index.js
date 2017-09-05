// @flow
import _ from 'lodash';
import * as React from 'react';

import axios from 'axios';

import PendingIndicator from '../../PendingIndicator';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    dumpReduxComponent: {
        isPending: boolean,
        data?: any,
        error?: any
    }
    // children?: React.Children
}
//
// type DefaultProps = {
//     data: Object
// };

class DumpReduxComponent extends React.Component<Props> {
    props: Props;

    // static defaultProps: DefaultProps = {
    //     data: {}
    // };

    componentDidMount() {
        this.props.makeFetch();
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }


    render() {
        const { data, isPending, error } = this.props.dumpReduxComponent;

        return (
            <section className="row">
                <div className="col-12">
                    <PendingIndicator pending={isPending} message={error && error.message}>
                        Загруженна информация: {data && data.test1 && _.join(data.test1)}
                    </PendingIndicator>
                </div>
            </section>
        );
    }
}

export default DumpReduxComponent;
