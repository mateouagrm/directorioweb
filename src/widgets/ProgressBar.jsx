import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const ProgressBar = ({ title, percentage }) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ width: `${percentage}%` });
    }, [controls, percentage]);

    return (
        <div className="mb-6">
            <div className="flex justify-between mb-1">
                <h3 className="text-white font-bold">{title}</h3>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-yellow-400 font-semibold"
                >
                    {percentage}%
                </motion.span>
            </div>
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-yellow-400"
                    initial={{ width: 0 }}
                    animate={controls}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
