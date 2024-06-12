import { useState , useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import {enqueueSnackbar} from "notistack"
const ShowCustomers = ({onClose , customerOrderedBy , setCustomerOrderedBy}) => {
    const [customers ,  setCustomers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5555/customers")
            .then((response) => {
                setCustomers(response.data.data)
            })
            .catch(err => {
                console.log("error fetching customers" + err)
            })
    }, [])
function selectCustomer(customer){
console.log(customer)
setCustomerOrderedBy(customer);
onClose()
}
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4  w-3/5  max-h-full ">
 
                <div className="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                           Select a customer
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={onClose}>
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>

                    <div className="p-4 md:p-5 bg-white">
                    <table className='w-full border-separate border-spacing-2 '>
                                        <thead>
                                            <tr className="">
                                                <th className=''>ID</th>
                                                <th className=''>Firstname</th>
                                                <th className=''>Lastname</th>
                                                <th className=''>Tel</th>
                                                <th className=''>Email</th>
                                                <th className=''>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers.map(customer => {
                                                return <tr key={customer.customerid} className="hover:bg-gray-200 cursor-pointer" onClick={()=>selectCustomer(customer)}>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.customerid}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.firstname}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.lastname}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.phone}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.email}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.address}</td>
                                                 
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShowCustomers