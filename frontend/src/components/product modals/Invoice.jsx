import React from 'react'
import { IoIosLogOut } from "react-icons/io";
const invoice = ({ invoice , onClose}) => {
    // console.log(viewDetail)
    return (
        <div className='fixed top-0 right-0 left-0 w-full bg-gray-300 opacity-1  h-full'>
         <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white mb-4" data-modal-hide="authentication-modal" onClick={onClose}>
         <IoIosLogOut className='text-2xl'/>
                        </button>
            <h1>Order ID ##    {               invoice[0].orderid}</h1>
            <h1>Order Date ###     {           invoice[0].orderdate}</h1>
            <h1>Customer Name  {              invoice[0].firstname }{ invoice[0].lastname}</h1>
            <table className='w-full border-separate border-spacing-2 mt-4'>
                <thead>
                    <tr className="">
                        <th className=''>Product ID</th>
                        <th className=''>Product Name</th>
                        <th className=''>Quantity</th>
                        <th className=''>Price</th>
                        <th className=''>Price * Quantity</th>
                    </tr>
                </thead>
                <tbody >
                    {invoice.map((detail) => {
                        return <tr key={detail.productid}>
                            <td className="border border-slate-700 rounded-md text-center">{detail.productid}</td>
                            <td className="border border-slate-700 rounded-md text-center">{detail.productname}</td>
                            <td className="border border-slate-700 rounded-md text-center">{detail.quantity}</td>
                            <td className="border border-slate-700 rounded-md text-center">{detail.unitprice}</td>
                            <td className="border border-slate-700 rounded-md text-center">{detail.quantity * detail.unitprice}</td>
                        </tr>

                    })}

                </tbody>
            </table>
            <h4>Total amount: {invoice[0].totalamount}</h4>
        </div>
    )
}

export default invoice