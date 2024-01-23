import {useEffect, useState} from "react";
import {useEstimate} from "../../hooks/estimates/useEstimate";
import {useNavigate, useParams} from "react-router-dom"
import "./EstimatePage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import {pluralDeliveryDate} from "../../utils/plural";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import IndicatorCard from "../../components/IndicatorCard/IndicatorCard";

const EstimatePage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const [flag, setFlag] = useState(false)

    const {
        estimate,
        apartment,
        date_estimate,
        setDateEstimate,
        setApartment,
        fetchEstimate,
        saveEstimate,
        sendEstimate,
        deleteEstimate,
        setEstimate,
    } = useEstimate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/indicators")
        }

        id && fetchEstimate(id)
        
        return () => {
            setEstimate(undefined)
        };
    }, [])

    if (id == undefined || estimate == undefined)
    {
        return (
            <div className="estimate-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendEstimate = async() => {
        setFlag(!flag)
        await saveEstimate()
        await sendEstimate()
        navigate("/estimates")
    }

    const onDeleteEstimate = async () => {
        await deleteEstimate()
        navigate("/indicators")
    }

    const onSaveEstimate = async () => {
        setFlag(!flag)
        await saveEstimate()
    }

    const cards = estimate.indicators.map(indicator  => (
        <IndicatorCard indicator={indicator} key={indicator.id} flag={flag}/>
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={onSaveEstimate} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendEstimate} bg={variables.blue}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteEstimate} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = estimate.status == 1

    const completed = [3, 4].includes(estimate.status)

    return (
        <div className="estimate-page-wrapper">

            <div className="estimate-indicators-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новый рассчёт" : `Рассчёт №${estimate.id}`}</h3>
                </div>

                <div className="estimate-info-container">
                    <span>Номер квартиры: {estimate.apartment}</span>
                    <span>Дата рассчёта: {moment(estimate.date_estimate).locale(ru()).format("D MMMM")}</span>
                    <span>Статус: {STATUSES.find(status => status.id == estimate.status).name}</span>
                    <span>Дата создания: {moment(estimate.date_created).locale(ru()).format("D MMMM HH:mm")}</span>

                    {[2, 3, 4].includes(estimate.status) && <span>Дата формирования: {moment(estimate.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(estimate.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Покупатель: {estimate.owner.name}</span> }
                    {is_moderator && <span>Модератор: {estimate.moderator.name}</span>}
                    {completed && <span>Дата доставки: {estimate.delivery_date > 0 ? pluralDeliveryDate(estimate.delivery_date) : "Нет"}</span>}
                </div>

                {is_draft &&
                    <div className="inputs-container">

                        <CustomInput id="apartment" placeholder="Номер квартиры" value={apartment} setValue={setApartment}/>
                        <CustomDatePicker placeholder="Дата рассчёта" value={date_estimate} setValue={setDateEstimate} />

                    </div>
                }


                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default EstimatePage