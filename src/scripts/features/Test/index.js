// @flow
import { connect } from 'react-redux';

import { makeFetch, cancelFetch} from './store/actions/fetch';

import Component from './_components';

function mapStateToProps({testComponent, router}: State) {
    return { testComponent, router};
}

export default connect(mapStateToProps, { makeFetch, cancelFetch })(Component);
