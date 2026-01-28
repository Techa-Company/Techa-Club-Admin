import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchCoupons = createAsyncThunk(
    'prize-shelf/fetchCoupons',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Coupon', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const createAndUpdateCoupon = createAsyncThunk(
    'prize-shelf/createAndUpdateCoupon',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Coupon', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)