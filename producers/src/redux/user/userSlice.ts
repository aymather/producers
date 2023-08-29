import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '../../types'


const initialState : UserState = {
    loggedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true
        },
        logout: (state) => {
            state.loggedIn = false
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const userReducer = userSlice.reducer

export const {
    login,
    logout
} = userSlice.actions
