import {useDispatch, useSelector} from 'react-redux';
import {
	updateIndicators,
	updateQuery
} from "../../store/indicators/indicatorsSlice";
import {api} from "../../utils/api";
import {useEstimate} from "../estimates/useEstimate";
import {useToken} from "../users/useToken";

export function useIndicators() {
	const indicators = useSelector(state => state.indicators.indicators);
	const query = useSelector(state => state.indicators.query);

	const {access_token} = useToken()

	const {fetchEstimate} = useEstimate()

	const dispatch = useDispatch()

	const setIndicators = (value) => {
		dispatch(updateIndicators(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchIndicators = async () => {

		const {data} = await api.get(`indicators/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_estimate_id = data["draft_estimate_id"]
		draft_estimate_id && fetchEstimate(draft_estimate_id)

		return data["indicators"]
	}

	const fetchIndicators = async () => {
		searchIndicators().then(data => setIndicators(data))
	}

	return {
		indicators,
		setIndicators,
		query,
		setQuery,
		searchIndicators,
		fetchIndicators
	};
}