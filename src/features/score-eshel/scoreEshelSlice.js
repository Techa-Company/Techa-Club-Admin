// src/features/score-eshel/scoreEshelSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateScenario, fetchcenarios } from './scoreEshelActions'

const initialState = {
    scores: [],
    loading: false,
    error: null,
}


const scoreEshelSlice = createSlice({
    name: 'scoreEshel',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchcenarios.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchcenarios.fulfilled, (state, action) => {
                state.loading = false
                state.scores = action.payload
            })
            .addCase(fetchcenarios.rejected, (state, action) => {
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

export default scoreEshelSlice.reducer