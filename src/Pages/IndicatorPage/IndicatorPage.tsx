import "./IndicatorPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iIndicatorsMock, requestTime} from "../../Consts";
import {Indicator} from "../../Types";
import mockImage from "/src/assets/mock.png"

const IndicatorPage = ({ selectedIndicator, setSelectedIndicator }: { selectedIndicator:Indicator | undefined, setSelectedIndicator: Dispatch<Indicator| undefined>}) => {

    const { id } = useParams<{id: string}>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined){
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/indicators/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok)
            {
                CreateMock()
                return;
            }

            const city: Indicator = await response.json()

            setSelectedIndicator(city)

            setIsMock(false)
        } catch
        {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedIndicator(iIndicatorsMock.find((service:Indicator) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/indicators/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedIndicator?.name}</h2>

                    <br />

                    <span className="description">{selectedIndicator?.description}</span>

                    <br />

                    <span>Единицы измереня: {selectedIndicator?.type}</span>

                </div>

            </div>

        </div>
    )
}

export default IndicatorPage;