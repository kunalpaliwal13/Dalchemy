
import Link from "next/link";
import { Poppins, Inter } from 'next/font/google'
import {motion} from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaLock } from "react-icons/fa";

const poppins = Poppins({
  weight: ['200'], // or whatever weights you need
  style: ['normal'],      // specify 'normal' style
  subsets: ['latin'],
});

const inter = Inter({subsets:["latin"],variable: '--font-inter',weight:['300']})
const HeroSection = () => {
    return(
        <>
        <motion.div animate={{opacity:[0,1],translateY:[20, 0]}}  transition={{duration:1}} className=" z-50 mt-50 items-center flex flex-col">
            <h1 className="text-6xl text-white font-medium tracking-tight">Transform Chaos into Clarity</h1>
   
            <p className="text-gray-400 text-wrap text-2xl mt-5 text-center tracking-tight">Upload messy spreadsheets, validate and clean your data, create smart allocation rules,<br></br> 
                and export ready-to-use configurations—all in one simple AI-powered workspace.</p>
        </motion.div>

        <motion.div animate={{opacity:[0.5, 1, 0.5] ,translateY:[20, 0]}} transition={{duration:5, repeat:Infinity}} className=" absolute top-55 h-72 w-3xl z-50 blur-2xl" style={{background: "radial-gradient(circle at center, rgba(45, 198, 83, 0.2), transparent 70%)"}}></motion.div>

        <motion.div animate={{opacity:[0,1],translateY:[20, 0]}} transition={{duration:1.5}} className="z-50">
        <Link href="/data" className="z-50 bg-[#2DC653] hover:bg-green-400 flex py-3 px-5 text-white mt-7 rounded-full items-center"> Get Started <IoIosArrowRoundForward className="text-2xl"/> </Link>
        </motion.div>
    

        <motion.div animate={{opacity:[0,1], translateY:[20, 0]}} transition={{duration:2}} className="w-[60vw] bg-black rounded-2xl border border-zinc-500 h-[200px] mt-20 min-h-[70vh] mb-50 z-50 relative">
            <div className="bg-black border-b border-zinc-500 rounded-t-2xl h-[7vh] flex justify-between px-3 py-3">
                <div className="text-white flex gap-2">
                    <div className="h-[25px] w-[25px] rounded-full bg-red-600"> </div>
                    <div className="h-[25px] w-[25px] rounded-full bg-yellow-500"> </div>
                    <div className="h-[25px] w-[25px] rounded-full bg-green-600"> </div>
                </div>
                <div className="text-white">
                    <div className="flex items-center gap-2 text-[15px] bg-[#262626] px-3 py-1 rounded-md mr-15"><FaLock /> https://d-alchemist.vercel.app</div>
                </div>
                <div className="text-white">  
                    
                </div>
            </div>
        </motion.div>



        </>


    )       
}

export default HeroSection;
