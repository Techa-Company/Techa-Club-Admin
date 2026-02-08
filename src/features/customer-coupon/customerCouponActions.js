import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchCustomerCoupons = createAsyncThunk(
    'prize-shelf/fetchCustomerCoupons',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Coupon_Customer', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

