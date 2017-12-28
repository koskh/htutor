// @flow

import _ from 'lodash';
import * as React from 'react';

import invariant from 'invariant';
import cn from 'classnames';

import PendingIndicator from '../../../components/PendingIndicator';
import Spinner from '../../../components/Indicators/Spiner'

import styles from './index.pcss';

import type { SettingsStore } from '../../../services/appSettings/store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    homeComponentStore: ComponentStore,
    settingsStore: SettingsStore,
    history: any,
    match: any
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
        const blockId = this.getBlockId();
        this.props.makeFetch(blockId);
    }

    componentWillUnmount() {
        this.props.cancelFetch();
    }

    onLearnClick(lessonId: number) {
        const blockId = this.getBlockId();
        this.props.history.push(`/learn/${blockId}/${lessonId}`);
    }

    onTestClick(lessonId: number) {
        const blockId = this.getBlockId();
        this.props.history.push(`/test/${blockId}/${lessonId}`);
    }

    getBlockId() {
        const blockIdFromSettings = this.props.settingsStore.data && this.props.settingsStore.data.currentBlockId; // TODO: refneed
        const blockId = this.props.match.params.blockId || blockIdFromSettings;
        return blockId;
    }

    render() {
        const { isPending, data } = this.props.homeComponentStore;

        // const { indexCurrentWord } = this.state;

        if (!data) {
            return (
                <article>
                    <h4 className="text-center">Список доступных уроков</h4>
                    <PendingIndicator pending={isPending} Indicator={Spinner}/>
                </article>
            );
        }

        // const word: TestWord = data.words[indexCurrentWord];
        // const questionData = this._generateQuestionData(word);

        const { title, lessons } = data;

        return (
            <article className="qa__home--body">
                <h4 className="text-center">{title}</h4>

                {_.map((lessons: Array<Lesson>), (v, i) =>
                    (
                        <div className="btn btn-light btn-lg btn-block mb-2 text-left" key={i}>
                            <div className="row " >
                                <div className="col-8 text-truncate">{v.title}</div>
                                <div className="col-4 d-flex justify-content-end align-items-center">
                                    <button type="button" className={cn('btn btn-secondary', 'mr-3 border-0 icon-4 icon-text')} onClick={() => this.onLearnClick(v.id)} />
                                    <button type="button" className={cn('btn btn-secondary', 'border-0 icon-4 icon-shuffle')} onClick={() => this.onTestClick(v.id)} />
                                </div>
                            </div>
                        </div>
                    )
                )}

            </article>
        );
    }
}
