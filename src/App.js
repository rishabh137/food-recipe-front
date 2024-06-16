import { Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Loader from "./common/Loader"
import { routes } from "./routes/routes"
import RecipeOverview from "./components/RecipeOverview"


const App = () => {
    return (
        <Suspense fallback={<Loader />} >
            <Routes>
                <Route exact path={routes.signup.path} element={<routes.signup.element />} />
                <Route exact path={routes.login.path} element={<routes.login.element />} />
                <Route exact path={routes.main.path} element={<Navigate to={routes.home.path} />} />
                <Route exact path={routes.main.path} element={<routes.main.element />} >
                    <Route exact path={routes.home.path} element={<routes.home.element />} />
                    <Route exact path={`${routes.home.path}/:id`} element={<RecipeOverview />} />
                    <Route exact path={routes.addrecipe.path} element={<routes.addrecipe.element />} />
                    <Route exact path={routes.myrecipe.path} element={<routes.myrecipe.element />} />
                </Route>
                <Route exact path={routes.invalid.path} element={<Navigate to={`${routes.main.path}`} />} />
            </Routes>
        </Suspense>
    )
}

export default App