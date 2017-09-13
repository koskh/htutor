import * as React from 'react';



export default class Home extends React.Component {
    componentWillMount() {
        document.title = 'Home· главная страница';
    }

    render() {
        return (
            <article>
                <p>Learn page</p>
            </article>
        );
    }
}
