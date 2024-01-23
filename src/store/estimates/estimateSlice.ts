import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	estimate: undefined,
	apartment: "",
	date_estimate: ""
};

const estimateSlice = createSlice({
	name: 'estimate',
	initialState: initialState,
	reducers: {
		updateEstimate(state, action) {
			state.estimate = action.payload
		},
		updateIndicators(state, action){
			state.estimate.indicators = action.payload
		},
		updateApartment(state, action){
			state.apartment = action.payload
		},
		updateDateEstimate(state, action){
			state.date_estimate = action.payload
		}
	}
})

export const {updateEstimate, updateIndicators, updateApartment, updateDateEstimate} = estimateSlice.actions;

export default estimateSlice.reducer;