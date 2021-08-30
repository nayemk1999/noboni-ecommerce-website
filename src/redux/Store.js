import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CartReducer from "./Reducers/CartReducer";
import UserReducer from "./Reducers/UserReducer";

const rootReducer = combineReducers({
    cart: CartReducer,
    user: UserReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export default store;