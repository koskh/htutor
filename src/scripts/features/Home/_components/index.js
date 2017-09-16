// @flow

import _ from 'lodash';
import * as React from 'react';

import PendingIndicator from '../../../components/PendingIndicator';
// import CardTest from '../../../components/CardTest';

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


    onLessonClick(lessonId: number) {
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
                    <button key={i} type="button" className="btn btn-light btn-lg btn-block mb-2 text-left" onClick={() => this.onLessonClick(v.id)}>{v.title}</button>
                )}

            </article>
        );
    }
}
