import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()

const RESEND_API = process.env.RESEND_API_KEY

if(!RESEND_API){
    console.log("provide the RESEND_API in .env file")
}


const resend = new Resend(RESEND_API);

const sendEmailVerification =async({sendTo,subject,html})=>{
    const { data, error } = await resend.emails.send({
        from: 'shopTN <onboarding@resend.dev>',
        to: sendTo,
        subject:subject,
        html: html,
      });
    
      if (error) {
        return console.error({ error });
      }
      console.log( data );
}


export default sendEmailVerification