import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user'
import { searchReducer } from './search'
import apiReducer, { api } from './api/apiSlice'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore
} from 'redux-persist'
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from 'react-redux'


const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        [api.reducerPath]: apiReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
        .concat(api.middleware)
    }
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
