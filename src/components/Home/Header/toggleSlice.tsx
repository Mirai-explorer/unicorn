import { createSlice } from '@reduxjs/toolkit'

export interface AsideState {
    action: boolean
}

const initialState: AsideState = {
    action: false,
}

export const toggleSlice = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        open: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.action = true
        },
        close: (state) => {
            state.action = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { open, close } = toggleSlice.actions

export default toggleSlice.reducer