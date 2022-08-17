import axios from "axios";

const instance = axios.create({
    baseURL: 'http://coding-test.cube19.io/frontend/v1/'
})

export const getUsers = () => {

    return instance.get('starting-state')
        .then(response => response.data)
        .catch(error => {
            if (error.response.status === 500) {
                return getUsers()
            }
            throw error
        })
}

export const setUser = async (username) => {

    return instance.post('process-user', {username})
        .then(response => response.data)
        .catch(error => {
            if (error.response.status === 500) {
                return setUser(username)
            }
            throw error
        })
}
