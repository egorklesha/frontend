import "./IndicatorsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import IndicatorsList from "./IndicatorsList/IndicatorsList";
import IndicatorsFilters from "./IndicatorsFilters/IndicatorsFilters";

const IndicatorsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="indicators-wrapper">

            <IndicatorsFilters />

            {!is_moderator && <IndicatorsList />}

        </div>
    )
}

export default IndicatorsPage;