// src/features/customer-level/customerLevel.js

import { createSlice } from '@reduxjs/toolkit'
import { fetchCustomerCoupons } from './customerCouponActions'

const initialState = {
    customerCoupons: [],
    loading: false,
    error: null,
}


const customerCoupon = createSlice({
    name: 'customerCoupons',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCustomerCoupons.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCustomerCoupons.fulfilled, (state, action) => {
                state.loading = false
                state.customerCoupons = action.payload
            })
            .addCase(fetchCustomerCoupons.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

    },
})

export default customerCoupon.reducer