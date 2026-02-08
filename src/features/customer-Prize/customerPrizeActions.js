import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchCustomerPrizes = createAsyncThunk(
    'prize-shelf/fetchCustomerPrizes',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_PrizeShelf_Customer', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
