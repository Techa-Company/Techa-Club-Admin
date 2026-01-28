import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchScores = createAsyncThunk(
    'prize-shelf/fetchScores',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Score_Eshel', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const createAndUpdateScore = createAsyncThunk(
    'prize-shelf/createAndUpdateScore',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Score_Eshel', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)