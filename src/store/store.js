import { configureStore } from "@reduxjs/toolkit"
import dashboardReducer from "../features/dashboard/dashboardSlice"
import prizeShelfReducer from "../features/prize-shelf/prizeShelfSlice"

const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        prizeShelf: prizeShelfReducer,
    }
})

export default store