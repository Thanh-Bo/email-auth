import {motion} from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden'>
            <motion.div 
                className='size-16 border-4 rounded-full'
                animate = {{ rotate:360}}
                transition = {{ duration : 1 , repeat : Infinity, ease : "linear"}}
            />
        </div>
    )
}
export default LoadingSpinner;