import axios from 'axios'
import summaryApi, { baseUrl } from '../common/summaryApi.js'
const Axios = axios.create({
    baseURL : baseUrl,
    withCredentials : true,
    timeout:5000
})

Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accessToken')

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
//extend the life span of acccess token with the help of refresh token
Axios.interceptors.response.use(
    (response)=>{
        return response 
    },
    async(error)=>{
        let originRequest = error.config
        if(error.response.status === 401 && !originRequest.retry){
            console.log('sanjayannnnnn response',error)
            originRequest.retry = true

            const refreshToken = localStorage.getItem("refreshToken")

            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken)
                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
        }
        return Promise.reject(error)
    }
)

const refreshAccessToken = async (refreshToken)=>{
    try{
        const response = await Axios({
            ...summaryApi.refreshToken,
            headers: {
                Authorization : `Bearer ${refreshToken}`
            }
        })

        const accessToken = response.data.data.accessToken
        localStorage.setItem('accessToken',accessToken)
        return accessToken
    }catch(err){
        console.log(err)
    }
}



export default Axios
