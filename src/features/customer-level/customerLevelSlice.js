// src/features/customer-level/customerLevel.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateLevel, fetchLevels } from './customerLevelActions'

const initialState = {
    levels: [],
    loading: false,
    error: null,
}


const customerLevel = createSlice({
    name: 'customerLevel',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLevels.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchLevels.fulfilled, (state, action) => {
                state.loading = false
                state.levels = action.payload
            })
            .addCase(fetchLevels.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateLevel.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateLevel.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateLevel.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default customerLevel.reducer