import express from 'express';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/jwt.js';
import { sendResetSuccessEmail, sendVerifycationEmail, sendWelcomeEmail, sentPasswordResetEmail } from '../mailtrap/emails.js';
import crypto from 'crypto';
dotenv.config();


export const signup = async (req ,res )=> {
    const {email , password , name } = req.body;
    try {
        if (!email || !password || !name){
            return res.status(400).json({success : false , message : "All fields are required"});
        }
        const userAlreadyExists = await User.findOne({email});
        if (userAlreadyExists){
            return res.status(400).json({success : false , message : "User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password , 10); 
        // Prevent hacker access database and steal password 
        // And conver it in to text 'ndgnsdf' and when u  enter password it conver it too 'ndgnsdf' and compare to 
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email ,
            password : hashedPassword,
            name, 
            verificationToken , 
            verificationTokenExpiresAt: Date.now() + 24 * 60 *  60 * 1000 /// 24 hours
        })

        await user.save(); // await is wait until the user is saved 
        // jwt
        generateTokenAndSetCookie(res , user._id);

        await sendVerifycationEmail(user.email, verificationToken);
        res.status(201).json({
            success : true , 
            message : 'User created successfully',
            user : {
                ...user._doc ,
                password : undefined
            }
        })
    }
    catch(error){
        return res.status(400).json({success : false , message : error.message})
    }
};



export const login = async (req ,res )=> {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({success : false , message : "Invalid Credential"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(400).json({success : true  , message : "Invalid Credential"});
        }

        generateTokenAndSetCookie(res, user._id);
        user.lastLogin= new Date();

        await user.save();

        res.status(200).json({
            success : true ,
            message : "Logged in successfully",
            user : {
                /// why password behind user._doc
                ...user._doc,
                password : undefined,
            }
        });
        

    }
    catch(error){
        return res.status(400).json({success : false, message : error.message});
    }
}  
    
export const verifyEmail = async (req, res) => {
    const {code} = req.body; 
    try {
        const user = await User.findOne({
            verificationToken : code , 
            verificationTokenExpiresAt : { $gt : Date.now()},
        });

        if (!user) {
            return res.status(400).json({success : false , message : "Invalid or expired verification code"});

        }

        user.isVerified = true ; 
        user.verificationToken = undefined ;
        user.verificationTokenExpiresAt = undefined ;

        await user.save();
        try {
            await sendWelcomeEmail(user.email , user.name);
        }
        catch(error){
            console.log("Error sending welcome email");
        }

        res.status(201).json({
            success : true , 
            message : "Email verified successfully",
            user : {
                ...user._doc,
                password : undefined,
            },
        });
    }
    catch(error){
        console.log("Error in verifyEmail : ", error);
        res.status(401).json({success : false , message : "Sever error"});
    }
}
export const logout = async (req ,res )=> {
    res.clearCookie('token');
    res.status(200).json({success : true , message : "Logged out successfully"});
}   

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({success : false, message : "User not found"});
        }

        // generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;


        await user.save();

        /// Send email
        await sentPasswordResetEmail(user.email , `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(201).json({
            success : true ,
            message : "Link reset password sent to your email"
        })
    }
    catch(error){
        console.log("Error in forgot password : ", error);
        return res.status(400).json({ success : false , message : error.message});
    }
};

export const resetPassword = async (req, res) => {
    try {
        // how user can received token
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken : token , 
            resetPasswordExpiresAt : { $gt: Date.now()},
        });

        if (!user){
            return res.status(400).json({
                success : false , 
                message : "Invalid or expired reset token",
            })
        }


        if (!password || password.length < 6){
            return res.status(400).json({
                success : false , 
                message : "Password must be at least 6 charaters long",
            })
        }

       
        // update password
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        
        // Save in database
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success : true , 
            message : "Password reset successfully",
        })
    }
    catch(error){
        console.log("Error in reset password : ", error);
        res.status(400).json({
            success : false , 
            message : error.message
        });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user){
            return res.status(400).json({
                success : false ,
                message : "User not found"
            })
        }
        res.status(200).json({
            success : true , 
            user
        })
    }
    catch(error){
        console.log('Error in checkAuth : ', error);
        res.status(400).json({
            success : false , 
            message : error.message
        });
    }
}