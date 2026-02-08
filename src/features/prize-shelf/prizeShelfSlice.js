// src/features/prize-shelf/prizeShelfSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdatePrize, deletePrize, fetchPrizeById, fetchPrizes, fetchPrizeTypes } from './prizeShelfActions'

const initialState = {
    prizes: [],
    singlePrize: null,
    prizeTypes: [],
    loading: false,
    error: null,
}


const prizeShelfSlice = createSlice({
    name: 'prizeShelf',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPrizes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPrizes.fulfilled, (state, action) => {
                state.loading = false
                state.prizes = action.payload
            })
            .addCase(fetchPrizes.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchPrizeById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPrizeById.fulfilled, (state, action) => {
                state.loading = false
                state.singlePrize = action.payload
            })
            .addCase(fetchPrizeById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdatePrize.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdatePrize.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdatePrize.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deletePrize.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deletePrize.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(deletePrize.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchPrizeTypes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchPrizeTypes.fulfilled, (state, action) => {
                state.loading = false
                state.prizeTypes = action.payload
            })
            .addCase(fetchPrizeTypes.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default prizeShelfSlice.reducer