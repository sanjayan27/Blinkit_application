export const baseUrl = 'http://localhost:8080/'

const summaryApi = {
    register : {
        endpoint: '/api/user/register',
        method: 'post'
    },
    login : {
        endpoint : '/api/user/login',
        method: 'post'
    },
    forgotPassword : {
        endpoint : '/api/user/forget-password',
        method: 'put'
    },
    otpVerification : {
        endpoint: '/api/user/verify-otp',
        method: 'put'
    },
    resetPassword : {
        endpoint: '/api/user/reset-password',
        method: 'put'
    },
    refreshToken :{
        endpoint: '/api/user/refresh-token',
        method: 'post'
    }
}

export default summaryApi