// src/features/forgot-scenario/forgotScenarioSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateScore, fetchScores } from './forgotScenarioActions'

const initialState = {
    scenarios: [],
    loading: false,
    error: null,
}


const forgotScenarioSlice = createSlice({
    name: 'forgotScenario',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchScores.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchScores.fulfilled, (state, action) => {
                state.loading = false
                state.scenarios = action.payload
            })
            .addCase(fetchScores.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateScore.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateScore.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateScore.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default forgotScenarioSlice.reducer