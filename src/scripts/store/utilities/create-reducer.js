// @flow
export default (initialStateForKey: State, handlers: {[string]: ReducerAction}) => (state: State = initialStateForKey, action: ReduxAction): {} => {
    return handlers[action.type] ? handlers[action.type](state, action) : state;
};
