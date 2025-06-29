
import Link from "next/link";
import { Poppins, Inter } from 'next/font/google'
import {motion} from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaClock, FaLock, FaReact } from "react-icons/fa";
import InfoCard from "./InfoCard"
import { FiDatabase } from "react-icons/fi";
import { MdCheckCircleOutline } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { RiSettings3Line } from "react-icons/ri";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { HiOutlineDownload } from "react-icons/hi";
const poppins = Poppins({
  weight: ['200'], // or whatever weights you need
  style: ['normal'],      // specify 'normal' style
  subsets: ['latin'],
});

const cards = [
  {
    heading: "Control Your Data",
    description: "Upload, clean, and organize your clients, workers, and tasks with a powerful AI-enabled workflow.",
    icon: <FiDatabase className="text-white text-4xl bg-gradient-to-b from-purple-500 to-purple-700 h-18 w-18 p-3 rounded-2xl"/>,
  },
  {
    heading: "Smart Validation",
    description: "Automatically detect duplicates, missing fields, malformed entries, and more in real-time.",
    icon: <MdCheckCircleOutline className="text-white text-4xl bg-gradient-to-b from-red-500 to-red-700 h-18 w-18 p-3 rounded-2xl" />,
  },
  {
    heading: "Natural Language Search",
    description: "Find and filter data instantly by typing what you need in plain English.",
    icon: <AiOutlineSearch className="text-white text-4xl bg-gradient-to-b from-yellow-500 to-yellow-700 h-18 w-18 p-3 rounded-2xl" />,
  },
  {
    heading: "Rule-Based Allocation",
    description: "Create custom rules to guide how tasks are assigned and priorities are set.",
    icon: <RiSettings3Line className="text-white text-4xl bg-gradient-to-b from-green-500 to-green-700 h-18 w-18 p-3 rounded-2xl" />,
  },
  {
    heading: "Priority Optimization",
    description: "Adjust weights and criteria to balance speed, fairness, and workload in one click.",
    icon: <TbAdjustmentsHorizontal className="text-white text-4xl bg-gradient-to-b from-orange-500 to-orange-700 h-18 w-18 p-3 rounded-2xl" />,
  },
  {
    heading: "Export Clean Data",
    description: "Download cleaned CSVs and a ready-to-go rules.json file for your next steps.",
    icon: <HiOutlineDownload className="text-white text-4xl bg-gradient-to-b from-blue-500 to-blue-700 h-18 w-18 p-3 rounded-2xl" />,
  },
];


const inter = Inter({subsets:["latin"],variable: '--font-inter',weight:['300']})
const HeroSection = () => {
    return(
        <>
        <div className="z-50 flex flex-col items-center mb-50">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="z-50 mt-50 items-center flex flex-col" >
            <h1 className="text-6xl text-white font-medium tracking-tight">Transform Chaos into Clarity</h1>
   
            <p className="text-gray-400 text-wrap text-2xl mt-5 text-center tracking-tight">Upload messy spreadsheets, validate and clean your data, create smart allocation rules,<br></br> 
                and export ready-to-use configurations—all in one simple AI-powered workspace.</p>
        </motion.div>

        <motion.div animate={{opacity:[0.5, 1, 0.5] ,translateY:[20, 0]}} transition={{duration:5, repeat:Infinity}} className=" absolute top-55 h-72 w-3xl z-50 blur-2xl" style={{background: "radial-gradient(circle at center, rgba(45, 198, 83, 0.2), transparent 70%)"}}></motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="z-50" >
        <Link href="/data" className="z-50 bg-gradient-to-b from-green-500 to-green-700 hover:bg-gradient-to-b hover:from-green-400 hover:to-green-500  hover:drop-shadow-2xl hover:shadow-green-400 flex py-3 px-5 text-white text-2xl mt-7  rounded-full items-center"> Get Started <IoIosArrowRoundForward className="text-2xl"/> </Link>
        </motion.div>
    

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-[60vw] bg-black rounded-2xl border border-zinc-500 pb-3 mt-20 h-auto mb-50 z-50 relative" >
            <div className="bg-black border-b border-zinc-500 rounded-t-2xl h-[7vh] flex justify-between px-3 py-3">
                <div className="text-white flex gap-2">
                    <div className="h-[25px] w-[25px] rounded-full bg-red-600"> </div>
                    <div className="h-[25px] w-[25px] rounded-full bg-yellow-500"> </div>
                    <div className="h-[25px] w-[25px] rounded-full bg-green-600"> </div>
                </div>
                <div className="text-white">
                    <div className="flex items-center gap-2 text-[15px] bg-[#262626] px-3 py-1 rounded-md mr-15"><FaLock /> https://d-alchemist.vercel.app</div>
                </div>
                <div></div>
            </div>
            <motion.img src ="/dashboard.png" animate={{opacity:[0,1]}} transition={{}} className="text-white"/>
        </motion.div>

        <div className="z-50 w-full justify-center  items-center flex flex-col py-20 h-80 my-30">
            <motion.div  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="text-white text-6xl font-medium">Control Your Data</motion.div>
           
        <div className="grid grid-cols-3 gap-10 mt-10">

        {cards.map((card, idx) => (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="mt-5 mb-10">
          <InfoCard
            key={idx}
            heading={card.heading}
            description={card.description}
            icon={card.icon}
          /></motion.div>
        ))}

        </div>
        </div>

        </div>


        </>


    )       
}

export default HeroSection;
