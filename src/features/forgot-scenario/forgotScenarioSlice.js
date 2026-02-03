// src/features/forgot-scenario/forgotScenarioSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateScenario, fetchScenarios } from './forgotScenarioActions'

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
            .addCase(fetchScenarios.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchScenarios.fulfilled, (state, action) => {
                state.loading = false
                state.scenarios = action.payload
            })
            .addCase(fetchScenarios.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateScenario.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateScenario.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateScenario.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default forgotScenarioSlice.reducer