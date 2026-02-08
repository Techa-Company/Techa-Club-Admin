// src/features/customer-level/customerCoupon.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchCustomerScores } from './customerScoreActions'

const initialState = {
    customerScores: [],
    loading: false,
    error: null,
}


const customerCoupon = createSlice({
    name: 'customerScores',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCustomerScores.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCustomerScores.fulfilled, (state, action) => {
                state.loading = false
                state.customerScores = action.payload
            })
            .addCase(fetchCustomerScores.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default customerCoupon.reducer