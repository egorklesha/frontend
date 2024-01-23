import EstimatesTable from "./EstimatesTable/EstimatesTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const EstimatesPage = () => {

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/indicators")
        }
    }, [])

    return (
        <div>
            <EstimatesTable />
        </div>
    )
}

export default EstimatesPage;

