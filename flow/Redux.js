/* eslint-disable no-undef */
declare type Type = string;
declare type ReduxAction= {type: Type, payload: ?{}};
declare type ThunkAction= (...args: Array<any>)=>State;
declare type ReducerAction= (state: State, action: {type: Type, payload: any}) => State; // действ редюсера
declare type ReducerActions = {[handler: Type]: ReducerAction};

// declare type State= {};

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

declare type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

declare type ComponentStore = {
    id: ?any,
    data: ?any,
    error: ?any,
    isPending: boolean,
    isUpdating: boolean
}

