import * as React from 'react';
// import Header from '../../components/page-header';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'Home· главная страница';
    }

    render() {
        return (
            <article>
                <p>Главная страница приложения. .Главная страница приложения. Главная страница приложения.</p>
            </article>
        );
    }
}
