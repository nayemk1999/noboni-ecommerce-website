import { ADD_TO_CART, ADJUST_QTY, CLEAR_CART, REMOVE_FROM_CART, REMOVE_QTY } from "../Types"

export const add_to_cart = (payload) =>{
    return {
        type: ADD_TO_CART,
        payload
    }
}
export const adjust_qty = (key, value) =>{
    return {
        type: ADJUST_QTY,
        payload:{
            key,
            value
        }
    }
}
export const remove_qty = (key, value) =>{
    return {
        type: REMOVE_QTY,
        payload:{
            key,
            value
        }
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