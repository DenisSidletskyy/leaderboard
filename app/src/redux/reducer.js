import {
    SET_LEADERS,
    SET_DAY,
    SET_IS_LOADED,
    SORT_DAY,
    SET_HISTORY,
    SET_POSITION,
    SET_DIFFERENCE,
    CHANGE_CURRENT_DAY, ADD_USER, TOGGLE_MODAL, UPDATE_USER, CHANGE_DAY
} from "./actions";

let defaultState = {
    days: null,
    leaders: null,
    history: null,
    currentDayIndex: 0,
    modal: {
        isOpen: false,
        user: null,
    },
    isLoaded: true
}

export const reducer = (state = defaultState, action) => {

    switch (action.type) {

        case SET_DAY:

            const days = state.days === null ? [] : [...state.days]

            const day = action.day.map((user, index) => ({
                id: index.toString(),
                name: user.name[0].toUpperCase() + user.name.slice(1),
                score: Number.isInteger(user.score) ? user.score : 0,
                position: {curr: null, diff: 0}
            }))

            days.push(day)

            return {...state, days}

        case SET_LEADERS: return {
            ...state,
            leaders: [...state.days]
                .flat()
                .sort((prev, next) => next.score - prev.score)
                .filter((value, index, self) =>
                    self.findIndex((v) => v.name === value.name) === index
                )
                .slice(0, 4)
        }


        case SET_IS_LOADED: return {
            ...state,
            isLoaded: action.isLoaded
        }

        case SORT_DAY: return {
            ...state,
            days: state.days.map((day, index) =>
                index === state.currentDayIndex
                    ? day.sort((prev, next) => next.score - prev.score)
                    : day
            )
        }

        case SET_HISTORY: return {
            ...state,
            history: [...state.days].reverse().slice(1).flat()
        }

        case SET_POSITION: return {
            ...state,
            days: state.days.map((day, index) =>
                index === state.currentDayIndex
                    ? day.map((user, index) => ({
                        ...user,
                        position: {...user.position, curr: index + 1}
                    }))
                    : day
            )
        }

        case SET_DIFFERENCE: {

            const setDiff = (history, user) => {

                for (let i = 0; i < history.length; i++) {
                    if (history[i].name === user.name) {
                        return history[i].position.curr - user.position.curr
                    }
                }

                return 0
            }

            return {
                ...state,
                days: state.history !== null
                    ? state.days.map((day, index) =>
                        index === state.currentDayIndex
                            ? day.map(user => ({
                                ...user,
                                position: {
                                    ...user.position,
                                    diff: setDiff(state.history, user)
                                }
                            }))
                            : day
                    )
                    : state.days
            }
        }

        case CHANGE_CURRENT_DAY: return {
            ...state,
            currentDayIndex: action.direction
                ? state.currentDayIndex + action.direction
                : state.days.length
        }

        case ADD_USER: return {
            ...state,
            days: state.days.map((day, index) =>
                index === state.currentDayIndex
                    ? [...day, {
                        id: day.length.toString(),
                        name: action.name,
                        score: action.score,
                        position: {curr: null, diff: 0}
                    }]
                    : day
            )
        }

        case UPDATE_USER: return {
            ...state,
            days: state.days.map((day, index) =>
                index === state.currentDayIndex
                    ? day.map(user =>
                        user.id === action.id
                            ? {...user, name: action.name, score: action.score}
                            : user
                    )
                    : day
            )
        }

        case CHANGE_DAY: return {
            ...state,
            currentDayIndex: state.currentDayIndex + action.direction
        }

        case TOGGLE_MODAL: return {
            ...state,
            modal: {
                ...state.modal,
                isOpen: action.isOpen,
                user: action.id
                    ? state.days[state.currentDayIndex].filter(user => user.id === action.id)[0]
                    : null
            }
        }

        default: return state
    }
}