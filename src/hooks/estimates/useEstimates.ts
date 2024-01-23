import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/estimates/estimatesSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useEstimates() {
	const status = useSelector(state => state.estimates.status)
	const date_start = useSelector(state => state.estimates.date_start)
	const date_end = useSelector(state => state.estimates.date_end)
	const user = useSelector(state => state.estimates.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchEstimates = async () => {

		const {data} = await api.get(`estimates/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		// data = data.filter(estimate => estimate.employer.name.includes(user))

		return data

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchEstimates,
		setDateStart,
		setDateEnd,
		setUser
	};
}