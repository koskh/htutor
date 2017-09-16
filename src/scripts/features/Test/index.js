// @flow
import { connect } from 'react-redux';

import { makeFetch, cancelFetch} from './store/actions/fetch';

import Component from './_components';

function mapStateToProps({testComponentStore}: State) {
    return { testComponentStore};
}

export default connect(mapStateToProps, { makeFetch, cancelFetch })(Component);
