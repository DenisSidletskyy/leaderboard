import {
    ADD_USER,
    CHANGE_POSITION,
    CHANGE_USER,
    FORMAT_USERS,
    OPEN_MODAL,
    SET_POSITION,
    SET_USERS,
    SORT_USERS
} from "./actions";

let defaultState = {
    users: null,
    modal: {
        isOpen: false,
        prevUserData: null
    }
}


export const reducer = (state = defaultState, action) => {

    switch (action.type) {

        case SET_USERS: return {
            ...state,
            users: action.users.map((user, index) => ({...user, id: index.toString(), score: Number.isInteger(user.score) ? user.score : 0}))
        }

        case ADD_USER: return {
            ...state,
            users: [...state.users, {...action.user, id: state.users.length.toString()}]
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
                            diff: user.position.curr - (index + 1)
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

        case OPEN_MODAL: return {
            ...state,
            modal: {
                isOpen: action.isOpen,
                prevUserData: action.id
                    ? state.users.filter(user => user.id === action.id)[0]
                    : null
            }
        }

        default: return state
    }
}