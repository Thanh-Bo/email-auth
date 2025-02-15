import {motion} from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
    const [email , setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {isLoading, forgotPassword} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
        setIsSubmitted(true);
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8' >
                <h2 className='text-3xl font-bold mb-6 text-center text-emerald-500'>
                    Forgot Password
                </h2>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} >
                        <p className='text-gray-300 mb-6 text-center'>
                            Enter your email address and we will send you a link to reset your password.
                        </p>
                        <Input
                            icon={Mail}
                            type='email'
                            placeholder= "Email Address"
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            
                        />
                        <motion.button
                            whileHover= {{scale : 1.02 }}
                            whileTap = {{scale : 0.98}}
                            className='w-full py-3 px-4 bg-emerald-500 text-white text-center font-bold 
                            rounded-lg shadow-lg  transition duration-200 hover:bg-emerald-600 focus:ring-2 focus:ring-green-500'
                            type='submit'
                        >
                            {isLoading ? <Loader className='size-6 animate-spin mx-auto'/> : "Send reset link"}
                        </motion.button>
                    </form>
                ) : (
                    <div className='text-center'>
                        <motion.div 
                            initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className='size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                        >
                            <Mail className='size-8 text-white' />
                        </motion.div>
                        <p className='text-gray-300 mb-6'>
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </p>
                    </div>
                )}
                
            </div>
            <div className='px-8 py-4 bg-gray-900 flex justify-center'>
                    <Link to='/login' className='text-xllg text-green-500 hover:underline flex items-center'>
                        <ArrowLeft className='size-4 mr-2' /> Back to login
                    </Link>
                </div>
        </motion.div>
    )
}

export default ForgotPassword