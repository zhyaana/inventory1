import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
const NavBar = () => {
  return (
    <div className="h-16 flex items-center bg-black">
    <nav className="bg-gray-200 shadow shadow-gray-300 w-full px-8 md:px-auto py-5">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center pt-5 justify-between flex-wrap md:flex-nowrap">
            <div className="text-indigo-500 md:order-1">
            <FaCircleUser className='text-4xl'/>
            </div>
            <div className="order-2 md:order-3">
                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50  rounded-xl flex items-center gap-2">
                <IoIosLogOut className='text-2xl'/>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    </nav>
</div>
  )
}

export default NavBar