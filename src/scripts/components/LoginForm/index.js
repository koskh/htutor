// @flow

import { connect } from 'react-redux';

// import reset from './store/actions/reset';
import { makeLogin, cancelLogin } from './store/actions/login';

import LoginForm from './_components/';

function mapStateToProps({ authUser, router }: State) {
    return { authUser, router };
}

export default connect(mapStateToProps, { makeLogin, cancelLogin })(LoginForm);

