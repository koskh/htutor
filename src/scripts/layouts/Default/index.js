// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../../components/Navigation';

import Home from '../../features/Home';
import Test from '../../features/Test';
import Learn from '../../features/Learn';
import NotFound from '../../features/NotFound';

const DefaultLayout = () => {
    return (
        <section>
            <header>
                <Route component={Navigation} />
            </header>

            <main className="container">
                <Switch>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/learn" component={Learn} />
                    <Route path="/test/:lessonId?" component={Test} key={new Date()} />
                    <Route component={NotFound} />
                </Switch>
            </main>

        </section>
    );
};

export default DefaultLayout;
