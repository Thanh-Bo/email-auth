import {motion }from 'framer-motion';
import Input from '../components/Input';
import {Mail, User, Lock, Loader, EyeOff, Eye} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

const SignupPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const {signup , isLoading , error} = useAuthStore();
    const [name, setName] = useState("");
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSignup = async (e) => {
        e.preventDefault();
        const result = await signup(email , password , name);
        if(result?.success){
            navigate('/verify-email');
        }

    };
  return (                                                                                                                  
    <motion.div     
        initial = {{opacity : 0 , y : 20}}
        animate={{ opacity : 1 , y : 0}}
        transition = {{ duration : 0.5}}
        // bg-opacity-50 
        className="max-w-md w-full  bg-gray-800/80 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"


        >
        <div className='p-8'>
            <h2 
                className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-500 
                text-transparent bg-clip-text'
            >       
                Create Account
            </h2>
            <form onSubmit={handleSignup} >
                {/* Name */}
                <Input 
                    icon = {User}
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {/* Mail */}
                <Input 
                    icon = {Mail}
                    type='email'
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
                
                <PasswordStrengthMeter password={password} />
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
                   {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
                </motion.button>
            </form>
        </div>
        {/* Have an account */}
        <div className='px-8 py-4 bg-gray-900 flex justify-center'>
            <p className='text-base text-gray-400'>
                Already have a account? {""}
                <Link to={'/login'} className='text-green-400 hover:underline'>
                    Login
                </Link>
            </p>
        </div>
    </motion.div>
  )
}

export default SignupPage