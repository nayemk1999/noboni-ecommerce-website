import { USER_ACTION } from "../Types";

const inialState = {}

const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ACTION: {
            const newState = action.payload
            return newState
        }
        default:
            return state
    }
}
export default UserReducer;