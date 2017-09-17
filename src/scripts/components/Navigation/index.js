// @Flownav
import * as React from 'react';
import { NavLink } from 'react-router-dom';
// import cn from 'classnames';

// import style from './index.pcss';

const Navigation = ({ match }) => (
    <nav className={'nav bg-light mb-4'}>
        <NavLink to={`${match.url}home`} className="nav-link">Home</NavLink>
        <NavLink to={`${match.url}learn`} className="nav-link">Learn</NavLink>
        <NavLink to={`${match.url}test`} className="nav-link">Test</NavLink>
    </nav>
);

export default Navigation;
