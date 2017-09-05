// @flow

import * as React from 'react';
import FormValidation from '../../../components/FormValidation';

// import cn from 'classnames';

import EmailPassword from './EmailPassword';
// import EmailPasswordSchema from './EmailPassword/_schema';

import styles from './index.pcss';

type Props = {
    makeLogin: Function,
    cancelLogin: Function,
    authUser: {
        isPending: boolean,
        data?: any,
        error?: any
    }
}

// const defaultProps: Props = {
//     // children: null
// };


class LoginForm extends React.Component<Props> {
    props: Props;
    // state: State;
    // static defaultProps: Props = {
    //     children: null
    // };

    // constructor(props: any) {
    //     super(props);
    // }

    componentDidMount() {
        // debugger;
        // history.push('/samples');
        // this.props.router.push('/mypath')
        // this.props.makeLogin();
    }

    componentWillUnmount() {
        // this.props.cancelLogin();
    }


    render(): React.Element<any> {
        // const { children } = this.props;

        return (
            <div className={styles.wrapper}>

                <div className={`${styles['form-signin']} rounded`}>

                    <h2 className={styles['form-signin-heading']}>Please sign in</h2>

                    <EmailPassword name="EmailPassword" isValidated={true} />

                    <div className="form-group">
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="rememberMe">
                                <input className="form-check-input" type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" />
                                Remember me
                            </label>
                        </div>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={true}>Sign in</button>

                </div>

            </div>
        );
    }
}

export default LoginForm;

