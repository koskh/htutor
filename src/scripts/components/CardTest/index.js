// @flow

import * as React from 'react';
import cn from 'classnames';

import styles from './index.pcss';

//eslint-disable-next-line

type Props = {
    word: Word
}

// const defaultProps: Props = {
//     children: null
// };


export default class CardTest extends React.Component<Props> {
    props: Props;
    // state: State;
    // static defaultProps: Props = {
    //     children: null
    // };

    // constructor(props: any) {
    //     super(props);
    // }


    render(): React.Element<any> {
        const { word } = this.props;

        return (
            <div>
                <button type="button" className="btn btn-light btn-lg btn-block">{word.foreign[0]}</button>

                <div className={`row ${styles.separator}`} />

                <button type="button" className="btn btn-light btn-lg btn-block mb-4">{word.foreign[0]}</button>

                <button type="button" className="btn btn-light btn-lg btn-block mb-4">{word.foreign[0]}</button>

                <button type="button" className="btn btn-light btn-lg btn-block mb-4">{word.foreign[0]}</button>

                <button type="button" className="btn btn-light btn-lg btn-block mb-4">{word.foreign[0]}</button>


                <div className={`row ${styles.separator}`} />

                <button type="button" className="btn btn-warning btn-lg btn-block">Пропустить</button>

            </div>
        );
    }
}

