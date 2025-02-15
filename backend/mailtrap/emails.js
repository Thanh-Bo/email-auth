import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerifycationEmail = async (email , verificationToken) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from : sender , 
            to : recipient , 
            subject : "Verify your email",
            html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category : "Email Verification",
            
        });
        console.log("Email sent successfully", response);
    }
    catch(error){
        console.error("Error sending verification email : ", error)
    }
};

export const sendWelcomeEmail = async (email , name) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from : sender , 
            to : recipient ,
            template_uuid: "84753126-748c-4a6e-a4df-d5f690fb2950",
            template_variables : {
                company_info_name : "Auth Company",
                name : name,
            }
        });
        console.log('Welcome email sent successfully', response);
    }
    catch(error){
        console.log('Error sending welcome email', error);
    }
}

export const sentPasswordResetEmail = async (email , resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from : sender , 
            to : recipient , 
            subject : "Verify your email",
            html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category : "Password Reset",
        });
        
    }
    catch(error){
        console.log('Error sending password reset email', error);
    }
};

export const sendResetSuccessEmail = async (email , res) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from : sender , 
            to : recipient,
            subject : "Password reset successfully",
            html : PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Password Reset",
        });
        console.log('Password reset email sent successfully', response);
    }
    catch(error){
        console.log("Error sending password reset success email : ", error);
    }
};