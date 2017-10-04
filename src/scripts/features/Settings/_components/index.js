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
        document.title = 'HTutor· Настройки приложения';
    }

    componentDidMount() {
        // this.props.makeFetch();
    }

    componentWillUnmount() {
        // this.props.cancelFetch();
    }


    render() {
        const { isPending, data } = this.props.homeComponentStore;

        // const { indexCurrentWord } = this.state;

        if (!data) {
            return (
                <article>
                    <h4 className="text-center">Настройки приложения</h4>
                    <PendingIndicator pending={isPending} />
                </article>
            );
        }

        // const word: TestWord = data.words[indexCurrentWord];
        // const questionData = this._generateQuestionData(word);

        return (

            <article>
                <h4 className="text-center">Настройки приложения</h4>


            </article>
        );
    }
}
