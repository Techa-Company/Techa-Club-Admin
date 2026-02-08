import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchCustomerScores = createAsyncThunk(
    'prize-shelf/fetchCustomerScores',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Score', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
