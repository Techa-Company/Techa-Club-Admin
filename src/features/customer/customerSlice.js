// src/features/customer-level/customer.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateCustomer, fetchCustomers } from './customerActions'

const initialState = {
    customers: [],
    loading: false,
    error: null,
}


const customer = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false
                state.customers = action.payload
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateCustomer.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateCustomer.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateCustomer.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default customer.reducer