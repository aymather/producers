import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SearchResults, SearchState } from '../../types'


const initialState : SearchState = {
    searchResults: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, action: PayloadAction<SearchResults>) => {
            state.searchResults = action.payload
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const searchReducer = searchSlice.reducer

export const {
    search
} = searchSlice.actions
