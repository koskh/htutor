// @flow

import _ from 'lodash';
import * as React from 'react';

import invariant from 'invariant';
import cn from 'classnames';

import PendingIndicator from '../../../components/PendingIndicator';

import styles from './index.pcss';

import type { ComponentStore } from '../store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    homeComponentStore: ComponentStore,
    history: any
}

// type State = {
//     indexCurrentWord: number
// }

export default class Test extends React.Component<Props> {
    props: Props;

    // state: State = {
    //     indexCurrentWord: 0
    // };

    componentWillMount() {
        document.title = 'HTutor· Список доступных уроков';
    }

    componentDidMount() {
        this.props.makeFetch();
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }

    onLearnClick(lessonId: number) {
        this.props.history.push(`/learn/${lessonId}`);
    }

    onTestClick(lessonId: number) {
        this.props.history.push(`/test/${lessonId}`);
    }

    render() {
        const { isPending, data } = this.props.homeComponentStore;

        // const { indexCurrentWord } = this.state;

        if (!data) {
            return (
                <article>
                    <h4 className="text-center">Список доступных уроков</h4>
                    <PendingIndicator pending={isPending} />
                </article>
            );
        }

        // const word: TestWord = data.words[indexCurrentWord];
        // const questionData = this._generateQuestionData(word);


        return (

            <article>
                <h4 className="text-center">Список доступных уроков</h4>

                {_.map((data: Array<Lesson>), (v, i) =>
                    (<div className="relative" key={i}>
                        <button type="button" className="btn btn-light btn-lg btn-block mb-2 text-left" >{v.title}</button>
                        <button type="button" className={cn('btn btn-secondary', styles['blackboard-btn'], 'mr-3 icon-blackboard')} onClick={() => this.onLearnClick(v.id)}/>
                        <button type="button" className={cn('btn btn-secondary', styles['gauge-btn'], 'mr-3 icon-shuffle')} onClick={() => this.onTestClick(v.id)} />
                    </div>)
                )}

            </article>
        );
    }
}
