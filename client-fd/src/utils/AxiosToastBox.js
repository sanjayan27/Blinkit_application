import toast from "react-hot-toast";

export const AxiosToastError =async(error)=>{
    toast.error(error.data.message)
}

export const AxiosToastSuccess = (response) =>{
    toast.success(response.data.message)
}