// @flow

import * as React from 'react';
import cn from 'classnames';

import styles from './index.pcss';

//eslint-disable-next-line

type Props = {
    children?: React.Children
}

// const defaultProps: Props = {
//     children: null
// };


class CardTest extends React.Component {
    props: Props;
    // state: State;
    static defaultProps: Props = {
        children: null
    };

    // constructor(props: any) {
    //     super(props);
    // }


    render(): React.Element<any> {
        // const { children } = this.props;

        return (
            <div>

                <div className={`row align-items-center border border-primary rounded ${styles.panel}`}>
                    <div className="col text-center">
                        <h2>Проверяемое слово</h2>
                    </div>
                </div>

                <div className={`row ${styles.separator}`} />

                <div className={`row align-items-center mb-4 border border-warning rounded ${styles.panel}`}>
                    <div className="col text-center">
                        <h2>вариант 1</h2>
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

export default CardTest;

