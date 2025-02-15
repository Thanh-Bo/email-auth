import {motion} from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import { Lock, Eye , EyeOff } from 'lucide-react';
const ResetPasswordPage = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword , setShowConfirmNewPassword] = useState(false)
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const {resetPassword ,  isLoading } = useAuthStore();
    const {token} = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try {
            await resetPassword(token , password)

            toast.success("Password reset successfully, redirecting to login page in 2 seconds...");
            setTimeout(() => {
                navigate('/login');
            }, 2000)
        }
        catch(error){
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    }
    return (
        <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center text-emerald-500'>
                    Reset Password
                </h2> 
                <form onSubmit={handleSubmit} >
                    {/* Password */}
                    <div className='relative'>
                        <Input
                            icon={Lock}
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Toggle Button - Positioned to the Right */}
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className='absolute top-3 right-0 pr-3 flex items-center'
                        >
                            {showNewPassword ? (
                                <EyeOff className="size-5 text-white" />
                            ) : (
                                <Eye className="size-5 text-white" />
                            )}
                        </button>              
                    </div>
                    {/* Confirm Password */}
                    <div className='relative'>
                        <Input
                            icon={Lock}
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {/* Toggle Button - Positioned to the Right */}
                        <button
                            type="button"
                            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                            className='absolute top-3 right-0 pr-3 flex items-center'
                        >
                            {showConfirmNewPassword ? (
                                <EyeOff className="size-5 text-white" />
                            ) : (
                                <Eye className="size-5 text-white" />
                            )}
                        </button>              
                    </div>
                    {/* {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                    {message && <p className='text-green-500 text-sm mb-4'>{message}</p>} */}
                    <motion.button 
                        whileHover= {{ scale : 1.02}}
                        whileTap = {{ scale : 0.98}}
                        className='w-full py-3 px-4 bg-emerald-500 text-white text-center rounded-lg shadow-lg hover:bg-emerald-600 
                        focus:ring-2 transition duration-200'
                        type = 'submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting..." : "Set New Password"}
                    </motion.button>
                </form> 
            </div>
           
        </motion.div>   
    )
}
export default ResetPasswordPage;
