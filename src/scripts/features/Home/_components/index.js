import * as React from 'react';
// import Header from '../../components/page-header';

export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'Home· главная страница';
    }

    render() {
        return (
            <article>
                <h4 className="text-center">Список доступных уроков</h4>
            </article>
        );
    }
}
