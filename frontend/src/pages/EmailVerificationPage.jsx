import {motion} from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast'
const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [code , setCode] = useState(['', '', '', '', '', '']);

    const { error , isLoading , verifyEmail} = useAuthStore();
    const inputRefs = useRef([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            const result = await verifyEmail(verificationCode);
            if (result?.success){
                navigate('/');
                toast.success("Email verified successfully");
            }
        }   
        catch(error){
            console.log(error);
        }
    };
    const handleChange = (index , value) => {
        const newCode = [...code];
        // Handle pasted content
        if (value.length > 1){
            const pastedCode = value.slice(0, 6).split('');
            for(let i = 0 ; i < 6 ; i++){
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        }
        else {
            newCode[index]= value;
            // can i replace this ? 
            // setCode(value)
            setCode(newCode);
            if(value && index < 5){
                inputRefs.current[index + 1].focus();
            }
            
        }

    }
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0){
            inputRefs.current[index - 1].focus();
        }
    }
    useEffect(() => {
        if (code.every((digit) => digit !== "")){
            handleSubmit(new Event("submit"));
        }
    }, [code]);
    return (
        <motion.div 
            initial= {{ opacity : 0 , y : -50}}
            animate= {{ opacity : 1 , y : 0}}
            transition= {{ duration : 0.5}}
            className='bg-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl
            max-w-md w-full overflow-hidden p-8'
        >
            <h2 className="mb-5 text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Verify Your Email
            </h2>
            <p className="mb-5 text-center text-gray-300">
                Enter the 6-digit code sent to your email address
            </p>
            <form onSubmit={handleSubmit} className='space-y-6' >
                <div className='flex justify-between'>
                    {code.map((digit , index) => (
                        <input 
                            key = {index}
                            // Can't get this line code
                            ref= {(el) => (inputRefs.current[index] = el)}
                            type = 'text'
                            maxLength='6'
                            value = {digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className='size-12 text-center text-2xl font-bold bg-gray-700 text-white
                            border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
                        />
                    ))}
                </div>
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                <motion.button
                    whileHover={{ scale:1.05}}
                    whileTap={{ scale : 0.95}}
                    type='submit'
                    disabled={isLoading || code.some((digit) => !digit)}
                    className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-3 rounded-lg shadow-lg 
                    hover:from-green-600 hover:to-emerald-700 focus:outline-none forcus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disable:opacity-50 '
                >
                    {isLoading ? "Verifying..." : "Verify Email"}
                </motion.button>
            </form> 
        </motion.div>
    )
    }

export default EmailVerificationPage