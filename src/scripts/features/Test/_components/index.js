// @flow

import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
import CardTest from '../../../components/CardTest';

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
        document.title = 'HTutor· проверяем';
    }

    componentDidMount() {
        this.props.makeFetch();
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }

    render() {
        const { isPending } = this.props.testComponent;
        const { data } = this.props.testComponent.data || {};
        const word: TestWord = data && data.words && data.words[0];

        return (
            <article>
                <p className="text-center">Статистика слова: показов: 0, правильн: 0, ошибок: 4</p>

                <PendingIndicator pending={isPending}>
                    <CardTest word={word} />
                </PendingIndicator>

            </article>
        );
    }
}
