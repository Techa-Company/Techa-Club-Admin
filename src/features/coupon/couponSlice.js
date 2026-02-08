// src/features/coupon/couponSlice.js

import { createSlice } from '@reduxjs/toolkit'
import { createAndUpdateCoupon, fetchCoupons, fetchCouponTypes } from './couponActions'

const initialState = {
    coupons: [],
    couponTypes: [],
    loading: false,
    error: null,
}


const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCoupons.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.loading = false
                state.coupons = action.payload
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createAndUpdateCoupon.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createAndUpdateCoupon.fulfilled, (state) => {
                state.loading = false
                // state.docs = action.payload
            })
            .addCase(createAndUpdateCoupon.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchCouponTypes.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCouponTypes.fulfilled, (state, action) => {
                state.loading = false
                state.couponTypes = action.payload
            })
            .addCase(fetchCouponTypes.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default couponSlice.reducer