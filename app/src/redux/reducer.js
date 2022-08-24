import {
    ADD_USER, CHANGE_CURRENT_USERS,
    CHANGE_POSITION,
    CHANGE_USER,
    FORMAT_USERS,
    OPEN_MODAL,
    SET_CURRENT_USERS, SET_GLOBAL_LEADERS, SET_IS_LOADED,
    SET_POSITION,
    SET_USERS,
    SORT_USERS
} from "./actions";

let defaultState = {
    users: null,
    currentUsersIndex: null,
    globalLeaders: null,
    modal: {
        isOpen: false,
        prevUserData: null
    },
    isLoaded: false
}

export const reducer = (state = defaultState, action) => {

    switch (action.type) {

        case SET_USERS: return {
            ...state,
            users: state.users
                ? [...state.users, action.users.map((user, index) => ({...user, id: index.toString(), score: Number.isInteger(user.score) ? user.score : 0}))]
                : [action.users.map((user, index) => ({...user, id: index.toString(), score: Number.isInteger(user.score) ? user.score : 0}))]
        }

        case SET_CURRENT_USERS: return {
            ...state,
            currentUsersIndex: Number.isInteger(action.index) ? action.index : state.users.length - 1
        }

        case CHANGE_CURRENT_USERS: return {
            ...state,
            currentUsersIndex: action.direction < 0 ? state.currentUsersIndex - 1 : state.currentUsersIndex + 1
        }

        case SET_GLOBAL_LEADERS: return {
            ...state,
            globalLeaders: state.users.flat().sort((prev, next) => next.score - prev.score).slice(0, 4)
        }

        case ADD_USER: return {
            ...state,
            //users: [...state.users, {...action.user, id: state.users.length.toString()}]
            users: state.users.map((users, index) => index === state.currentUsersIndex
                ? [...users, {...action.user, id: state.users[state.currentUsersIndex].length.toString()}]
                : users
            )
        }

        case SORT_USERS: return {
            ...state,
            //users: [...state.users].sort((prev, next) => next.score - prev.score)
            users: state.users.map((users, index) => index === state.currentUsersIndex
                ? users.sort((prev, next) => next.score - prev.score)
                : users
            )
        }

        case FORMAT_USERS: return {
            ...state,
            //users: state.users.map(user => ({...user, name: user.name[0].toUpperCase() + user.name.slice(1)}))
            users: state.users.map((users, index) => index === state.currentUsersIndex
                ? users.map(user => ({...user, name: user.name[0].toUpperCase() + user.name.slice(1)}))
                : users
            )
        }

        case SET_POSITION: return {
            ...state,
            //users: state.users.map((user, index) => ({...user, position: {curr: index + 1, prev: null, diff: null}}))
            users: state.users.map((users, index) => index === state.currentUsersIndex
                ? users.map((user, index) => ({...user, position: {curr: index + 1, prev: null, diff: null}}))
                : users
            )
        }

        case CHANGE_POSITION: return {
            ...state,
            /*users: state.users.map((user, index) => {

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
            })*/
            users: state.users.map((users, index) => index === state.currentUsersIndex
                ? users.map((user, index) => {

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

                : users
            )
        }

        case CHANGE_USER: return {
            ...state,
            /*users: state.users.map(user => user.id === action.id
                ? {...user, name: action.name, score: action.score}
                : user
            )*/
            users: state.users.map((users, index) => index === state.currentUsersIndex
                ? users.map(user => user.id === action.id
                    ? {...user, name: action.name, score: action.score}
                    : user
                )
                : users
            )
        }

        case OPEN_MODAL: return {
            ...state,
            modal: {
                isOpen: action.isOpen,
                prevUserData: action.id
                    ? state.users[state.currentUsersIndex].filter(user => user.id === action.id)[0]
                    : null
            }
        }

        case SET_IS_LOADED: return {
            ...state,
            isLoaded: action.isLoaded
        }

        default: return state
    }
}