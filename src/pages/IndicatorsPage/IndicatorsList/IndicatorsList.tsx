import "./IndicatorsList.sass"
import {useEffect} from "react";
import IndicatorCard from "../../../components/IndicatorCard/IndicatorCard";
import {useIndicators} from "../../../hooks/indicators/useIndicators";

const IndicatorsList = () => {

    const {indicators, fetchIndicators} = useIndicators()

    useEffect(() => {
        fetchIndicators()
    }, [])

    const cards = indicators.map(indicator  => (
        <IndicatorCard indicator={indicator} key={indicator.id}/>
    ))

    return (
        <div className="indicators-list">

            { cards }

        </div>
    )
}

export default IndicatorsList;