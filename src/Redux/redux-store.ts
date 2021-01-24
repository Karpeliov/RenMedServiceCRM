import {combineReducers, createStore} from "redux";
import eqpmntReducer from "./eqpmnt-reduser";


let reducers = combineReducers({
    Equipment: eqpmntReducer,

})


export let store = createStore(reducers)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof reducers>

export default store