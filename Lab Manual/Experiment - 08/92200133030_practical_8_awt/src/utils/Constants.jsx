import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";

export const categories = [
  { name: "New", icon: <AiFillHome />, type: "home" },
  { name: "Shorts", icon: <MdLocalFireDepartment />, type: "category" },
  {
    name: "Subscription",
    icon: <MdOutlineSubscriptions />,
    type: "category",
    divider: true,
  },
  { name: "Your Channel", icon: <FiFilm />, type: "category" },
  { name: "History", icon: <MdLiveTv />, type: "category" },
  { name: "Your Videos", icon: <IoGameControllerSharp />, type: "category" },
  { name: "Watch later", icon: <ImNewspaper />, type: "category" },
  { name: "Liked Videos", icon: <BiLike />, type: "category", divider: true },
  { name: "Learning", icon: <RiLightbulbLine />, type: "category" },
  { name: "Settings", icon: <FiSettings />, type: "menu" },
  { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
  { name: "Help", icon: <FiHelpCircle />, type: "menu" },
  { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
];
