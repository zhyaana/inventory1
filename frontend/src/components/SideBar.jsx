import {Link} from "react-router-dom"
import { MdHome } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi"
import { IoIosPeople } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { SiVite } from "react-icons/si";
const SideBar = () => {
  return (
    <>
 <div class="w-64 px-4 bg-gray-900 ">

<div class="px-2 pt-10 pb-8 border-r border-gray-300">
   <div className='flex items-center px-2 mt-20 mb-10 text-6xl text-white '>
   <SiVite className=''/> <span className='text-2xl'>Logo</span>
   </div>
    <ul class="space-y-2 mt-1o ">
        <li>
            <Link to='/' class="bg-gray-500 bg-opacity-30 text-white text-2xl flex items-center justify-between py-1.5 px-4 rounded cursor-pointer">
                <span class="flex items-center space-x-2">
                    <MdHome/>
                    <span>Home</span>
                </span>
                {/* <span class="bg-sky-500 text-gray-100 font-bold px-2 py-0.5 text-xs rounded-lg">3</span> */}
            </Link>
        </li>
        <li>
            <Link to='/products' class="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-700 flex items-center text-white text-2xl py-1.5 px-4 rounded space-x-2 cursor-pointer">
               <AiFillProduct/>
                <span>Products</span>
            </Link>
        </li>
        <li>
            <Link to='/categories' class="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-500 flex items-center text-white  text-2xl py-1.5 px-4 rounded space-x-2 cursor-pointer">
               <BiSolidCategoryAlt/>
                <span>Categories</span>
            </Link>
        </li>
        <li>
            <Link to='/customers' class="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-500 flex items-center text-white text-2xl py-1.5 px-4 rounded space-x-2 cursor-pointer">
               <IoIosPeople/>
                <span>Customers</span>
            </Link>
        </li>
        <li>
            <Link to='/orders' class="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-500 flex items-center text-white text-2xl py-1.5 px-4 rounded space-x-2 cursor-pointer">
              <FaShoppingBasket/>
                <span>Orders</span>
            </Link>
        </li>
        <li>
            <Link to='/users' class="hover:bg-gray-500 hover:bg-opacity-10 hover:text-blue-500 flex items-center justify-between text-white text-2xl py-1.5 px-4 rounded space-x-2 cursor-pointer">
                <span class="flex items-center space-x-2">
                   <FaUserCheck/>
                    <span>Users</span>
                </span>
                <span class="bg-sky-500 text-gray-100 font-bold px-2 py-0.5 text-xs rounded-lg">1</span>
            </Link>
        </li>
    </ul>
</div>
</div>
    </>
  )
}

export default SideBar