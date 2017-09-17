// @flow
import { RESET } from '../constants';
import { createAction } from '../../../../store/utilities';

const reset: ThunkAction = createAction(RESET);

export default () => reset();
