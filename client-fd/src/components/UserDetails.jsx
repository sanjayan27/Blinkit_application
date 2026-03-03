import react from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Divider from "./Divider"
import {logout} from "../store/userSlice"
import {useDispatch} from "react-redux"
import Axios from "../utils/Axios"
import summaryApi from "../common/summaryApi"

const UserDetails = ({close})=>{
    const dispatch = useDispatch()
    const user = useSelector((state)=>{
        return state.user
    })
    const handleLogout = async()=>{
        try{
            const response = await Axios({
                url: summaryApi.logout.endpoint,
                method: summaryApi.logout.method
            })
            if(response.data.error){
                console.error("Logout error:", response.data.error);
                return;
            }
            if(response.data.success){
                close()
                localStorage.clear()
                dispatch(logout())
            }
        }catch(err){
            console.error("Error during logout:", err);
        }
    }
    return (
        <div>
            <h3 className = "font-semibold">My Account</h3>
            <p className ="text-sm">{user.name || user.mobile}</p>
            <Divider/>

            <div className="grid gap-2 text-sm">
                <Link to={""} className = "px-2">
                    My Orders
                </Link>
                <Link to={""} className = "px-2">
                    Save Address
                </Link>
                <button className = "text-left px-2" onClick= {()=>handleLogout()}>LogOut</button>
            </div>
        </div>
        
    )
}
export default UserDetails