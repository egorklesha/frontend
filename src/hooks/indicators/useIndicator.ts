import {useDispatch, useSelector} from 'react-redux';
import {
	updateIndicator
} from "../../store/indicators/indicatorSlice";
import {api} from "../../utils/api";

export function useIndicator() {
	const indicator = useSelector(state => state.indicator.indicator);

	const dispatch = useDispatch()

	const setIndicator = (value) => {
		dispatch(updateIndicator(value))
	}

	const fetchIndicator = async (id) => {

		const {data} = await api.get(`indicators/${id}`);

		setIndicator(data)

	};

	return {
		indicator,
		setIndicator,
		fetchIndicator
	};
}