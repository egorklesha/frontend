import "./EstimateConstructor.sass"
import {useEstimate} from "../../hooks/estimates/useEstimate";
import {Link} from "react-router-dom";

const EstimateConstructor = () => {

    const {estimate} = useEstimate()

    if (estimate == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новый рассчёт</span>
            </div>
        )
    }

    return (
        <Link to={`/estimates/${estimate.id}`} className="constructor-container">
            <span className="title">Новый рассчёт</span>
            {estimate.indicators.length > 0 && <span className="badge">{estimate.indicators.length}</span>}
        </Link>
    )
}

export default EstimateConstructor