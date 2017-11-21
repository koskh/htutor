// @flow

import _ from 'lodash';
import * as React from 'react';

// import invariant from 'invariant';
import cn from 'classnames';

import PendingIndicator from '../../../components/PendingIndicator';
import ResetSoundsCache from '../../../components/ResetSoundsCashe';

import styles from './index.pcss';

import type {SettingsStore} from '../../../services/appSettings/store/reducer';

type Props = {
    makeFetch: Function,
    cancelFetch: Function,
    makeSave: Function,
    cancelSave: Function,
    makeFetchComponent: Function,
    cancelFetchComponent: Function,
    settingsStore: SettingsStore,
    settingsComponentStore: ComponentStore,
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
        this.props.makeFetchComponent();
    }

    componentWillUnmount() {
        this.props.cancelSave();
        this.props.cancelFetchComponent();
    }

    setActiveBlock(id: number) {
        const currentSettingsData = this.props.settingsStore;
        currentSettingsData.data.currentBlockId = id;
        this.props.makeSave(currentSettingsData);
    }


    render() {
        const {isPending} = this.props.settingsStore;
        const currentBlockId = this.props.settingsStore.data.currentBlockId;

        const {data} = this.props.settingsComponentStore;


        if (!data) {
            return (
                <article>
                    <h4 className="text-center">Настройки приложения</h4>
                    <PendingIndicator pending={isPending}/>
                </article>
            );
        }


        return (

            <article>
                <h4 className="text-center">Настройки приложения</h4>

                <div className="mb-4">
                    <p className="font-weight-bold">Блоки слов (темн.- активный)</p>

                    {_.map((data: Array<LessonsBlock>), (v, i) =>
                        (
                            <div
                                className={cn('btn  btn-block mb-2 text-left', currentBlockId === v.id ? 'btn-secondary' : 'btn-light')}
                                key={i}
                                onClick={() => {
                                    this.setActiveBlock(v.id);
                                }}
                            >
                                <div className="row">
                                    <div className="col-10">
                                        {v.title}
                                    </div>
                                    <div className="col-2 d-flex justify-content-end align-items-center">
                                        <div className={cn('border icon-4', currentBlockId === v.id ? 'icon-check' : '')}/>
                                    </div>
                                </div>

                            </div>
                        )
                    )}
                </div>

                <div className="mb-4">
                    <p className="font-weight-bold">Инструменты</p>
                    <ResetSoundsCache />
                </div>

            </article>
        );
    }
}
