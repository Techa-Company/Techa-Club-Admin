import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchScenarios = createAsyncThunk(
    'prize-shelf/fetchScenarios',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_Business_ForgotScenario', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)


export const createAndUpdateScenario = createAsyncThunk(
    'prize-shelf/createAndUpdateScenario',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Business_ForgotScenario', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)