import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import dashboardReducer from "../features/dashboard/dashboardSlice"
import prizeShelfReducer from "../features/prize-shelf/prizeShelfSlice"
import scoreEshelReducer from "../features/score-eshel/scoreEshelSlice"
import couponReducer from "../features/coupon/couponSlice"
import forgotScenarioReducer from "../features/forgot-scenario/forgotScenarioSlice"
import customerLevelReducer from "../features/customer-level/customerLevelSlice"
import customerReducer from "../features/customer/customerSlice"
import customerPurchasesReducer from "../features/customer-purchase/customerPurchaseSlice"
import customerScoresReducer from "../features/customer-score/customerScoreSlice"
import customerPrizesReducer from "../features/customer-Prize/customerPrizeSlice"
import customerCouponsReducer from "../features/customer-coupon/customerCouponSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        prizeShelf: prizeShelfReducer,
        scoreEshel: scoreEshelReducer,
        coupon: couponReducer,
        forgotScenario: forgotScenarioReducer,
        customerLevel: customerLevelReducer,
        customers: customerReducer,
        customerPurchases: customerPurchasesReducer,
        customerScores: customerScoresReducer,
        customerPrizes: customerPrizesReducer,
        customerCoupons: customerCouponsReducer,
    }
})

export default store