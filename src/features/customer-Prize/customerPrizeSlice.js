// src/features/customer-level/customerPrize.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchCustomerPrizes } from './customerPrizeActions'

const initialState = {
    customerPrizes: [],
    loading: false,
    error: null,
}


const customerPrizes = createSlice({
    name: 'customerPrizes',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCustomerPrizes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCustomerPrizes.fulfilled, (state, action) => {
                state.loading = false
                state.customerPrizes = action.payload
            })
            .addCase(fetchCustomerPrizes.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default customerPrizes.reducer