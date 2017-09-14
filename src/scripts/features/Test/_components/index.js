// @flow

import _ from 'lodash';
import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
import CardTest from '../../../components/CardTest';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    testComponentStore: ComponentStore
}

type State = {
    indexCurrentWord: number
}

export default class Test extends React.Component<Props, State> {
    props: Props;

    state: State = {
        indexCurrentWord: 0
    };

    componentWillMount() {
        document.title = 'HTutor· проверяем';
    }

    componentDidMount() {
        this.props.makeFetch();
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }

    onNextClick = () => {

    }

    render() {
        const { isPending, data } = this.props.testComponentStore;
        // const { data } = this.props.testComponentStore;

        const { indexCurrentWord } = this.state;

        const word: ?TestWord = data && data.words && data.words[indexCurrentWord];

        return (
            <article>
                <p className="text-center">Статистика слова: показов: 0, правильн: 0, ошибок: 4</p>

                <PendingIndicator pending={isPending}>
                    <CardTest word={word} />
                    <button type="button" className="btn btn-warning btn-lg btn-block" onClick={this.onNextClick}>Пропустить</button>
                </PendingIndicator>

            </article>
        );
    }
}
