import axios from 'axios';

const initialState = {
    user: {name: '', userId: 0}
}

const   GET_USER = 'GET_USER',
        LOGIN_USER = 'LOGIN_USER',
        LOGOUT_USER = 'LOGOUT_USER';

export function getUser(user){
    console.log(user)
    return {
        type: GET_USER,
        payload: user
    }
}

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user,
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export default function (state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload};
        case LOGOUT_USER:
            return {...state, ...action.payload};
        // case GET_USER + 'PENDING':
            // return state;
        case GET_USER:
            console.log(action.payload)
            return {user: action.payload};
        // case GET_USER + 'REJECTED':
        //     return initialState;
        default:
            return initialState;
    }
}