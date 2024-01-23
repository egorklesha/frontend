import React from "react";
import "./EstimatesTable.sass"
import {STATUSES} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useEstimates} from "../../../hooks/estimates/useEstimates";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import EstimatesFilters from "../EstimatesFilters/EstimatesFilters";

const EstimatesTable = () => {

    const navigate = useNavigate()

    const {searchEstimates} = useEstimates()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Номер квартиры",
            accessor: "apartment",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        }
    ]

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["estimates"],
        () => searchEstimates(),
        {
            keepPreviousData: true,
        }
    );

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const handleClick = (estimate_id) => {
        navigate(`/estimates/${estimate_id}`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <EstimatesFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default EstimatesTable