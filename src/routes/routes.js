import { lazy } from "react"

const AddRecipe = lazy(() => import('../components/AddRecipe'))
const MyRecipe = lazy(() => import('../components/MyRecipe'))
const Recipe = lazy(() => import('../components/Recipe'))
const Signup = lazy(() => import('../components/Signup'))
const Login = lazy(() => import('../components/Login'))
const Main = lazy(() => import('../pages/Main'))

const routes = {
    signup: {
        path: '/signup',
        element: Signup
    },
    login: {
        path: '/login',
        element: Login
    },
    main: {
        path: '/',
        element: Main
    },
    home: {
        path: '/recipes',
        element: Recipe
    },
    addrecipe: {
        path: '/add-recipe',
        element: AddRecipe
    },
    myrecipe: {
        path: '/my-recipe',
        element: MyRecipe
    },
    invalid: {
        path: '*'
    }
}

export { routes }