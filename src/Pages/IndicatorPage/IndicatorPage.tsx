import "./IndicatorPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useIndicator} from "../../hooks/indicators/useIndicator";

const IndicatorPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {indicator, fetchIndicator} = useIndicator()
    
    useEffect(() => {
        id && fetchIndicator(id)
    }, [])

    if (indicator == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/indicators/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{indicator.name}</h2>

                    <br />

                    <span className="description">{indicator.description}</span>

                    <br />

                    <span className="foundation_date">Год основания: {indicator.foundation_date}г</span>

                    <br />

                    <span className="grp">Население: {indicator.grp} млн</span>

                    <br />

                    <span className="square">Площадь: {indicator.square} км^2</span>

                    <br />

                    <span className="climate">Климат: {indicator.climate}</span>

                </div>

            </div>

        </div>
    )
}

export default IndicatorPage;