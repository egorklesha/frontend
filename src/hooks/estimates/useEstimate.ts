import {useDispatch, useSelector} from 'react-redux';
import {
	updateEstimate,
	updateIndicators,
	updateApartment,
	updateDateEstimate
} from "../../store/estimates/estimateSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useEstimate() {

	const {access_token} = useToken()

	const estimate = useSelector(state => state.estimate.estimate)
	const apartment = useSelector(state => state.estimate.apartment)
	const date_estimate = useSelector(state => state.estimate.date_estimate)

	const is_draft = estimate?.status == 1

	const dispatch = useDispatch()

	const setEstimate = (value) => {
		dispatch(updateEstimate(value))
	}

	const setIndicators = (value) => {
		dispatch(updateIndicators(value))
	}

	const setApartment = (value) => {
		dispatch(updateApartment(value))
	}

	const setDateEstimate = (value) => {
		dispatch(updateDateEstimate(value))
	}

	const sendEstimate = async () => {

		const response = await api.put(`estimates/${estimate.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setEstimate(undefined)
			setApartment("")
			setDateEstimate("")
		}
	}

	const deleteEstimate = async () => {

		const response = await api.delete(`estimates/${estimate.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setEstimate(undefined)
			setApartment("")
			setDateEstimate("")
		}

	}

	const saveEstimate = async () => {

		const form_data = new FormData()

		form_data.append('apartment', apartment)
		form_data.append('date_estimate', date_estimate)

		await api.put(`estimates/${estimate.id}/update/`, form_data, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchEstimate = async (estimate_id) => {

		const {data} = await api.get(`estimates/${estimate_id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		setEstimate(data)
		setApartment(data["apartment"])
		setDateEstimate(data["date_estimate"].split('T')[0])

	}

	const addIndicatorToEstimate = async (indicator) => {

		const response = await api.post(`indicators/${indicator.id}/add_to_estimate/`, {}, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setEstimate(response.data)
		}
	}

	const deleteIndicatorFromEstimate = async (indicator) => {
		const response = await api.delete(`estimates/${estimate.id}/delete_indicator/${indicator.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setIndicators(response.data)
		}
	}

	return {
		estimate,
		apartment,
		date_estimate,
		is_draft,
		setEstimate,
		setIndicators,
		setApartment,
		setDateEstimate,
		saveEstimate,
		sendEstimate,
		deleteEstimate,
		fetchEstimate,
		addIndicatorToEstimate,
		deleteIndicatorFromEstimate
	};
}