// @flow

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../../components/Navigation';

import Home from '../../features/Home';
import Test from '../../features/Test';
import Learn from '../../features/Learn';
import Settings from '../../features/Settings';
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
                    <Route path="/home/:blockId?" component={Home} />
                    <Route path="/learn/:blockId?/:lessonId?" component={Learn} />
                    <Route path="/test/:blockId?/:lessonId?" component={Test} />
                    <Route path="/settings" component={Settings} />
                    <Route component={NotFound} />
                </Switch>
            </main>

            <footer className="mt-3">
                &nbsp;
            </footer>

        </section>
    );
};

export default DefaultLayout;
