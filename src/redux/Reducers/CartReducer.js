import { ADD_TO_CART, ADJUST_QTY, CLEAR_CART, REMOVE_FROM_CART } from "../Types";
const inialState = []

const CartReducer = (state = inialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const toBeAdded = action.payload.key
            const sameProduct = state.find(pd => pd.key === toBeAdded);
            let count = 1;
            let newCart;
            if (sameProduct) {
                count = sameProduct.quantity + 1;
                sameProduct.quantity = count;
                const others = state.filter(pd => pd.key !== toBeAdded)
                newCart = [...others, sameProduct]
            }
            else {
                action.payload.quantity = 1;
                newCart = [...state, action.payload]
            }
            return newCart
        }

        case ADJUST_QTY: {
            const toBeAdded = action.payload.key
            const sameProduct = state.find(pd => pd.key === toBeAdded);
            let count = sameProduct.quantity;
            let newCart;
            if (sameProduct) {
                count = +action.payload.value;
                sameProduct.quantity = count;
                const others = state.filter(pd => pd.key !== toBeAdded)
                newCart = [...others, sameProduct]
            }
            else {
                action.payload.quantity = 1;
                newCart = [...state, action.payload]
            }
            return newCart
            // return newState
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