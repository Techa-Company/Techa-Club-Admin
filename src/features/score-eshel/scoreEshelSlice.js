// src/features/score-eshel/scoreEshelSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateScore, fetchScores } from './scoreEshelActions'

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
            .addCase(fetchScores.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchScores.fulfilled, (state, action) => {
                state.loading = false
                state.scores = action.payload
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

export default scoreEshelSlice.reducer