// @flowfix after  deploy
import { connect } from 'react-redux';

import { makeFetch, cancelFetch} from './store/actions/fetch';

import Component from './_components';

function mapStateToProps({homeComponentStore}: State) {
    return { homeComponentStore};
}

export default connect(mapStateToProps, { makeFetch, cancelFetch })(Component);
