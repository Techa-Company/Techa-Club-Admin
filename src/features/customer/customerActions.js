import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchCustomers = createAsyncThunk(
    'prize-shelf/fetchCustomers',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Customer', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const createAndUpdateCustomer = createAsyncThunk(
    'prize-shelf/createAndUpdateCustomer',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Customer', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)