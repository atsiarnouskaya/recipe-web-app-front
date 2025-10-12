import {useContext} from "react";
import {AuthContext} from "../../API/Context";
import {privateRoutes, publicRoutes} from "../../router/routes";
import {Navigate, Route, Routes} from "react-router-dom";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);

    return (

        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path} />
                )}
                <Route path="*" element={<Navigate to="/allRecipes" replace />} />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.component}
                        path={route.path} />
                )}

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>



    )
}

export default AppRouter;