import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchLevels = createAsyncThunk(
    'prize-shelf/fetchLevels',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Business_Level', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const createAndUpdateLevel = createAsyncThunk(
    'prize-shelf/createAndUpdateLevel',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Business_Level', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)