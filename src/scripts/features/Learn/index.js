// @flow
import { connect } from 'react-redux';

import { makeFetch, cancelFetch} from './store/actions/fetch';
import resetStore from './store/actions/reset';

import Component from './_components';

function mapStateToProps({learnComponentStore}: State) {
    return { learnComponentStore};
}

export default connect(mapStateToProps, { makeFetch, cancelFetch, resetStore })(Component);
