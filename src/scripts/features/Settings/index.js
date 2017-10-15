// @flow
import { connect } from 'react-redux';

import { makeFetch, cancelFetch } from '../../services/appSettings/store/actions/fetch';
import { makeSave, cancelSave } from '../../services/appSettings/store/actions/store';

import { makeFetch as makeFetchComponent, cancelFetch as cancelFetchComponent } from './store/actions/fetch';

import Component from './_components';

function mapStateToProps({ settingsComponentStore, settingsStore }: State) {
    return { settingsComponentStore, settingsStore };
}

export default connect(mapStateToProps, { makeFetch, cancelFetch, makeSave, cancelSave, makeFetchComponent, cancelFetchComponent })(Component);
