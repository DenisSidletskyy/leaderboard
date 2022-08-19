import {ADD_USER, CHANGE_POSITION, CHANGE_USER, FORMAT_USERS, SET_POSITION, SET_USERS, SORT_USERS} from "./actions";

export const reducer = (state = {users: null}, action) => {

    switch (action.type) {

        case SET_USERS: return {
            ...state,
            users: action.users.map((user, index) => ({...user, id: index, score: Number.isInteger(user.score) ? user.score : 0}))
        }

        case ADD_USER: return {
            ...state,
            users: [...state.users, {...action.user, id: state.users.length}]
        }

        case SORT_USERS: return {
            ...state,
            users: [...state.users].sort((prev, next) => next.score - prev.score)
        }

        case FORMAT_USERS: return {
            ...state,
            users: state.users.map(user => ({...user, name: user.name[0].toUpperCase() + user.name.slice(1)}))
        }

        case SET_POSITION: return {
            ...state,
            users: state.users.map((user, index) => ({...user, position: {curr: index + 1, prev: null, diff: null}}))
        }

        case CHANGE_POSITION: return {
            ...state,
            users: state.users.map((user, index) => {

                if (!user.position) {
                    return {
                        ...user,
                        position: {curr: index + 1, prev: null, diff: null}}
                }

                if (user.position.curr !== index + 1) {
                    return {
                        ...user,
                        position: {
                            curr: index + 1,
                            prev: user.position.curr,
                            diff: Math.abs(user.position.curr - (index + 1))
                        }
                    }
                }

                return user
            })
        }

        case CHANGE_USER: return {
            ...state,
            users: state.users.map(user => user.id === action.id
                ? {...user, name: action.name, score: action.score}
                : user
            )

        }

        default: return state
    }
}