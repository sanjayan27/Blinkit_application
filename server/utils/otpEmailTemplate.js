const otpEmailTemplate = ({name,otp})=>{
    return `
        <section>
            <h1> ${name} </h1>
            <p> ${otp} </p>
        </section>
    `
}
export default otpEmailTemplate