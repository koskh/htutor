// @flow

import * as React from 'react';
import CardTest from '../../../components/CardTest/index';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    testComponent: {
        isPending: boolean,
        data?: any,
        error?: any
    }
}

export default class Test extends React.Component<Props> {
    props: Props;

    componentWillMount() {
        document.title = 'Home· главная страница';
    }

    componentDidMount() {
        this.props.makeFetch();
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }

    render() {
        return (
            <article>
                <p className="text-center">Статистика слова: показов: 0, правильн: 0, ошибок: 4</p>

                <CardTest />
            </article>
        );
    }
}
