import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchCustomerPurchases = createAsyncThunk(
    'prize-shelf/fetchCustomerPurchases',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Business_Buy', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
