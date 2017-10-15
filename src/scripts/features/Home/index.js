// @flow
import { connect } from 'react-redux';

import { makeFetch, cancelFetch} from './store/actions/fetch';


import Component from './_components';

function mapStateToProps({homeComponentStore, settingsStore}: State) {
    return { homeComponentStore, settingsStore};
}

export default connect(mapStateToProps, { makeFetch, cancelFetch})(Component);
