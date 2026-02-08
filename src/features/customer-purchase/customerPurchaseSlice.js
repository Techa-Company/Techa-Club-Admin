// src/features/customer-level/customerLevel.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchCustomerPurchases } from './customerPurchaseActions'

const initialState = {
    customerPurchases: [],
    loading: false,
    error: null,
}


const customerPurchase = createSlice({
    name: 'customerPurchases',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCustomerPurchases.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCustomerPurchases.fulfilled, (state, action) => {
                state.loading = false
                state.customerPurchases = action.payload
            })
            .addCase(fetchCustomerPurchases.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default customerPurchase.reducer