import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	indicator: undefined,
};

const indicatorSlice = createSlice({
	name: 'indicator',
	initialState: initialState,
	reducers: {
		updateIndicator(state, action) {
			state.indicator = action.payload
		}
	}
})

export const {
	updateIndicator
} = indicatorSlice.actions;

export default indicatorSlice.reducer;