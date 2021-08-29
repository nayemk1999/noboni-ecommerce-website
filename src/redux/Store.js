import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CartReducer from "./Reducers/CartReducer";

const rootReducer = combineReducers({
    cart: CartReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export default store;