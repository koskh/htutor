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

                <div className={`row align-items-center border border-primary rounded ${styles.panel}`}>
                    <div className="col text-center">
                        <h2> {word.foreign[0]} </h2>
                    </div>
                </div>

                <div className={`row ${styles.separator}`} />

                <div className={`row align-items-center mb-4 border border-warning rounded ${styles.panel}`}>
                    <div className="col text-center">
                        <h2>{word.native[0]}</h2>
                    </div>
                </div>
                <div className={`row align-items-center mb-4 border border-warning rounded ${styles.panel}`}>
                    <div className="col text-center">
                        <h2>вариант 2</h2>
                    </div>
                </div>
                <div className={`row align-items-center mb-4 border border-warning rounded ${styles.panel}`}>
                    <div className="col text-center">
                        <h2>вариант 3</h2>
                    </div>
                </div>


            </div>
        );
    }
}

