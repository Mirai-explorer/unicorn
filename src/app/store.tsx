import { configureStore } from '@reduxjs/toolkit'
import toggleReducer from '@/components/Home/Header/toggleSlice'

export const store = configureStore({
    reducer: {
        toggle: toggleReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch