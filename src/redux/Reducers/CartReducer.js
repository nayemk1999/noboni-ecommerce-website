import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../Types";
const inialState = []

const CartReducer = (state = inialState, action) => {
    switch(action.type){
        case ADD_TO_CART: {
            const newState = [...state, action.payload]
            return newState
        }
        case REMOVE_FROM_CART: {
            const newState = state.filter(item => item.key !== action.payload)
            return newState
        }
        case CLEAR_CART: {
            const newState = []
            return newState
        }
        default: 
        return state
    }
}
export default CartReducer;