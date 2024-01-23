import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	indicators: [],
	query: ""
};

const indicatorsSlice = createSlice({
	name: 'indicators',
	initialState: initialState,
	reducers: {
		updateIndicators(state, action) {
			state.indicators = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateIndicators,
	updateQuery
} = indicatorsSlice.actions;

export default indicatorsSlice.reducer;