import "./IndicatorCard.sass"
import {Indicator} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useEstimate} from "../../hooks/estimates/useEstimate";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useEffect, useState} from "react";
import CustomInput from "../CustomInput/CustomInput";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";

const IndicatorCard = ({ indicator, flag }: {indicator:Indicator}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {estimate, is_draft, addIndicatorToEstimate, deleteIndicatorFromEstimate} = useEstimate()

    const handleAddIndicator = (e) => {
        e.preventDefault()
        addIndicatorToEstimate(indicator)
    }

    const handleDeleteIndicator = (e) => {
        deleteIndicatorFromEstimate(indicator)
    }

    const {access_token} = useToken()

    const updateIndicatorValue = async () => {
        const form_data = new FormData()

        form_data.append('value', value)

        await api.put(`estimates/${estimate.id}/update_indicator/${indicator.id}/`, form_data, {
            headers: {
                'authorization': access_token
            }
        })
    }

    const fetchIndicatorValue = async () => {
        const {data} = await api.get(`estimates/${estimate.id}/indicators/${indicator.id}/`, {
            headers: {
                'authorization': access_token
            }
        })
        setValue(data)
    }

    const [value, setValue] = useState()

    useEffect(() => {
        location.pathname.includes("estimates") && fetchIndicatorValue()
    }, [])

    useEffect(() => {
        value && updateIndicatorValue()
    }, [flag])

    const is_chosen = estimate?.indicators.find(g => g.id == indicator.id)

    const show_values = [2, 3, 4].includes(estimate?.status)

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={indicator.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {indicator.name} </h3>

                </div>

                {show_values && location.pathname.includes("estimates") &&
                    <div className="card-inputs-container">
                        <CustomInput placeholder="Значение счётчика" value={value} setValue={setValue} disabled={!is_draft}/>
                    </div>
                }

                <div className="content-bottom">

                    <Link to={`/indicators/${indicator.id}`}>
                        <CustomButton bg={variables.blue}>
                            Подробнее
                        </CustomButton>
                    </Link>

                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("indicators") &&
                        <CustomButton onClick={handleAddIndicator} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("indicators") &&
                        <CustomButton onClick={handleDeleteIndicator} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("estimates") &&
                        <CustomButton onClick={handleDeleteIndicator} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default IndicatorCard;