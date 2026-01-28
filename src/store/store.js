import { configureStore } from "@reduxjs/toolkit"
import dashboardReducer from "../features/dashboard/dashboardSlice"
import prizeShelfReducer from "../features/prize-shelf/prizeShelfSlice"
import scoreEshelReducer from "../features/score-eshel/scoreEshelSlice"
import couponReducer from "../features/coupon/couponSlice"
import forgotScenarioReducer from "../features/forgot-scenario/forgotScenarioSlice"
import customerLevelReducer from "../features/customer-level/customerLevelSlice"

const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        prizeShelf: prizeShelfReducer,
        scoreEshel: scoreEshelReducer,
        coupon: couponReducer,
        forgotScenario: forgotScenarioReducer,
        customerLevel: customerLevelReducer,
    }
})

export default store