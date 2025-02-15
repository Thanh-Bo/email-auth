import {motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date';
import { Loader } from 'lucide-react';

const DashBoardPage = () => {
    const {user , logout, isLoading} = useAuthStore();

    const handleLogout = () => {   
        logout();
    }
    return (
        <motion.div
            initial = {{ opacity : 0 , scale : 0.9}}
            animate = {{ opacity : 1 , scale : 1}}
            exit ={{ opacity : 0 , scale : 0.9}}
            transition={{ duration : 0.5}}
            className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 
            backdrop-filter backdrop-blur-lg rounded-xl '
        >
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
                Dashboard
            </h2>
            
            <div className='space-y-6'>
                {/* Infor */}
                <motion.div 
                    className='p-4 bg-gray-800 rounded-lg border border-gray-700'
                    initial= {{ opacity : 0 , y : 20}}
                    animate={{ opacity : 1 , y : 0}}
                    transition={{ delay : 0.2}}
                >
                    <h2 className='font-semibold text-green-400 mb-1 text-2xl'>Profile Information</h2>
                    <h3 className='text-gray-300 text-xl'>Name : {user.name}</h3>
                    <h3 className='text-gray-300 text-xl'>Email : {user.email}</h3>
                </motion.div>
                {/* Time */}
                <motion.div 
                    className='p-4 bg-gray-800 rounded-lg border border-gray-700'
                    initial= {{ opacity : 0 , y : 20}}
                    animate={{ opacity : 1 , y : 0}}
                    transition={{ delay : 0.5}}
                >
                    <h2 className='text-2xl font-semibold text-green-400 mb-1'>Account Activity</h2>
                    <h3 className='text-gray-300 text-xl'>
                        <span className='font-bold'>Joined: </span>
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year : 'numeric',
                            month:'long',
                            day:'numeric',
                        })}
                    </h3>
                    <h3 className='text-gray-300 text-xl'>
                        <span className='font-bold'>Last Login : </span>
                        {formatDate(user.lastLogin)}
                    </h3>
                </motion.div>
            </div>
            {/* Button */}
            <motion.button
                whileHover= {{ scale : 1.05}}
                whileTap= {{ scalae : 0.95}}
                onClick={handleLogout}
                className='mt-4 w-full py-3 px-4 bg-emerald-500 text-white font-bold
                rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-gray-900'
                disabled={isLoading}
            >
                {isLoading ? <Loader className='size-6 animate-spin mx:auto'/> : "Logout"}
            </motion.button>
        </motion.div>
    )
}

export default DashBoardPage