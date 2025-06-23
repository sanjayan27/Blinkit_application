import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import OtpValidation from '../pages/OtpValidation'
import ResetPassword from '../pages/ResetPassword'


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path:"",
                element: <Home/>
            },
            {
                path:"search",
                element: <SearchPage/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"register",
                element: <Register/>
            },
            {
                path:"forget-password",
                element: <ForgotPassword/>
            },
            {
                path:"verify-otp",
                element: <OtpValidation/>
            },
            {
                path:"reset-password",
                element: <ResetPassword/>
            }
        ]
    }
])
export default router