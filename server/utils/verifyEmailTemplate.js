const verifyEmailTemplate = ({name, URL})=>{
    return(
        `
        <p>welcome ${name}</p>
        <p>thanks for registering into our shop - shopTN</p>
        <a href=${URL} style="color:blue;">
        verify email </a>
        `
    )
}

export  default verifyEmailTemplate