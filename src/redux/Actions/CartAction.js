import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../Types"

export const add_to_cart = (payload) =>{
    return {
        type: ADD_TO_CART,
        payload
    }
}
export const remove_from_cart = (payload) =>{
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}
export const clear_cart = (payload) =>{
    return {
        type: CLEAR_CART,
        payload
    }
}