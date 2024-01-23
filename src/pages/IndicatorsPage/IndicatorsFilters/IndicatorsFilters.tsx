import "./IndicatorsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useIndicators} from "../../../hooks/indicators/useIndicators";

const IndicatorsFilters = () => {

    const {query, setQuery, fetchIndicators} = useIndicators()

    const handleSubmit = () => fetchIndicators()

    return (
        <div className="indicators-filters">

            <h2>Поиск счётчиков</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default IndicatorsFilters