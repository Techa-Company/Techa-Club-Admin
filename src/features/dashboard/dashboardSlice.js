// src/features/dashboard/dashboardSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchDashboard } from './dashboardActions'

const initialState = {
    dashboard: null,
    loading: false,
    error: null,
}


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false
                state.dashboard = action.payload
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default dashboardSlice.reducer