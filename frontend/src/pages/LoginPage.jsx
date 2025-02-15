import {motion }from 'framer-motion';
import Input from '../components/Input';
import {Mail,  Lock, Loader, Eye, EyeOff} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { isLoading , login} = useAuthStore();
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(email , password);
        if (result?.success){
            navigate('/');
        }
        
    
    }
  return (                                                                                                                  
    <motion.div     
        initial = {{opacity : 0 , y : 20}}
        animate={{ opacity : 1 , y : 0}}
        transition = {{ duration : 0.5}}
        // bg-opacity-50 
        className='max-w-md w-full bg-gray-800 bg-opacity-50     backdrop-blur-xl rounded-2xl
        shadow-xl overflow-hidden '
    >
        <div className='p-8'>
            <h2     
                className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-500 
                text-transparent bg-clip-text'
            >       
                Welcome Back
            </h2>
            <form onSubmit={handleLogin}>
                <Input 
                    icon = {Mail}
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Password */}
                <div className='relative'>
                    <Input
                        icon={Lock}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Toggle Button - Positioned to the Right */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute top-3 right-0 pr-3 flex items-center'
                    >
                        {showPassword ? (
                            <EyeOff className="size-5 text-white" />
                        ) : (
                            <Eye className="size-5 text-white" />
                        )}
                    </button>
               
                </div>
                <div className='flex items-center '>
                    <Link to='/forgot-password' className='text-sm text-green-400 hover:underline mb-6'>
                        Forgot password?
                    </Link>
                </div>
               
                {/* Button Confirm */}  
                <motion.button 
                    className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 
                        text-white font-bold rounded-lg shalow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none 
                        focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    whileHover={{ scale : 1.02}}
                    whileTap={{ scale : 0.98}}
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? <Loader className='size-6 animate-spin mx-auto'/> : "Login"}
                </motion.button>
            </form>
        </div>
        {/* Have an account */}
        <div className='px-8 py-4 bg-gray-900 flex justify-center'>
            <p className='text-base text-gray-400 '>
                Don't have a account?  
                
                <Link to={'/signup'} className='text-green-400 hover:underline ml-2'>
                    Signup
                </Link>
            </p>
        </div>
    </motion.div>
  )
}

export default SignupPage