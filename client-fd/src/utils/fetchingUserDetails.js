import Axios from "./Axios";
import summaryApi from "../common/summaryApi.js"


const fetchingUserDetails = async()=>{
    try {
            const response = await Axios({
                url : summaryApi.getUserDetails.endpoint,
                method : summaryApi.getUserDetails.method,
    
            })  
            return response.data
            
        
    }catch(error){
        return {
            success: false ,
            error : error.message || "An error occurred while fetching user details"
        }
    }
}

export default fetchingUserDetails