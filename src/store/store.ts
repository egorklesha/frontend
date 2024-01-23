import {configureStore} from "@reduxjs/toolkit";

import indicatorReducer from "./indicators/indicatorSlice"
import draftEstimateReducer from "./estimates/estimateSlice"
import authReducer from "./users/authSlice"
import estimatesReducer from "./estimates/estimatesSlice"
import indicatorsReducer  from "./indicators/indicatorsSlice"

export default configureStore({
	reducer: {
		indicator: indicatorReducer,
		indicators: indicatorsReducer,
		estimate: draftEstimateReducer,
		estimates: estimatesReducer,
		user: authReducer
	}
});