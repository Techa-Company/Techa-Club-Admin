import { createAsyncThunk } from "@reduxjs/toolkit"
import { SP_fetch } from "@/services/api"


export const fetchPrizes = createAsyncThunk(
    'prize-shelf/fetchPrizes',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_PrizeShelf', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)



export const fetchPrizeById = createAsyncThunk(
    'prize-shelf/fetchPrizeById',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Form_PrizeShelf', parameters)
            console.log(res.Data[0])
            return res.Data[0]
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const createAndUpdatePrize = createAsyncThunk(
    'prize-shelf/createAndUpdateExercise',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_PrizeShelf', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deletePrize = createAsyncThunk(
    'prize-shelf/deletePrize',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Delete_PrizeShelf', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const fetchPrizeTypes = createAsyncThunk(
    'prize-shelf/fetchPrizeTypes',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_typePrize', parameters)
            console.log(res.Data)
            return res.Data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
