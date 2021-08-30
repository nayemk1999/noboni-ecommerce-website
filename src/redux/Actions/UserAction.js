import { USER_ACTION } from "../Types"

export const user_info = (payload) =>{
    return {
        type: USER_ACTION,
        payload
    }
}