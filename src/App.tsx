import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import IndicatorPage from "./pages/IndicatorPage/IndicatorPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import IndicatorsPage from "./pages/IndicatorsPage/IndicatorsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import EstimateConstructor from "./components/EstimateConstructor/EstimateConstructor";
import EstimatePage from "./pages/EstimatePage/EstimatePage";
import EstimatesPage from "./pages/EstimatesPage/EstimatesPage";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("indicators") && <EstimateConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/rent">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/indicators" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/indicators" element={<IndicatorsPage />} />

                                    <Route path="/indicators/:id" element={<IndicatorPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/estimates/:id" element={<EstimatePage />} />

                                    <Route path="/estimates" element={<EstimatesPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
