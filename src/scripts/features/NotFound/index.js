// @flow

import * as React from 'react';
// import Header from '../../components/page-header';

export default class NotFound extends React.Component<*> {
    componentWillMount() {
        document.title = '404 · Страница не найдена';
    }

    render() {
        return (
            <article>
                <h1>Страница не найдена</h1>
                <p>Вернитесь назад и попробуйте еще раз.</p>
            </article>
        );
    }
}
