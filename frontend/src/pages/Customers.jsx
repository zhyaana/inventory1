import SideBar from '../components/SideBar'
import { useState, useEffect } from 'react'
import { enqueueSnackbar } from "notistack"
import axios from 'axios'
const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({ customerid: 0, firstname: "", lastname: "", email: "", phone: "", state: "", zipcode: "", address: "" });
    const [detail, setDetail] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:5555/customers")
            .then((response) => {
                setCustomers(response.data.data)
            })
            .catch(err => {
                console.log("error fetching customers" + err)
            })
    }, [])
    function handleChange(e) {
        const { name, value } = e.target;

        setCustomer(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function showDetail(customer) {
        setCustomer(customer)
        // /customer/details/:customerID
        axios.get(`http://localhost:5555/customers/customer/details/${customer.customerid}`)
            .then(response => {
                console.log("get the details")
                const last = (response.data.count) - 1;
                const detail = response.data.data[last];
                setDetail(detail);
                setCount(response.data.count)
                console.log(response.data.count)
            })
            .catch(err => {
                console.log("error getting details" + err)
            })

    }
    function addCustomer() {
        axios.post(`http://localhost:5555/customers/customer`, customer)
            .then((response) => {
                if (response === 200 || response === 201) {
                    enqueueSnackbar("Customer added successfully", { variant: "success" })
                    setCustomer({ customerid: 0, firstname: "", lastname: "", email: "", phone: "", state: "", zipcode: "", address: "" })
                    setCustomers(prevCustomers => {

                        const updatedCustomers = [...prevCustomers, customer];

                        return updatedCustomers
                    });
                }
            })
            .catch((err) => {
                console.log("Error added  customer" + err)
            })
    }
    function deleteCustomer(id) {
        axios.delete(`http://localhost:5555/customers/customer/${id}`)
            .then((response) => {
                console.log("seccussfully deleted")
                if (response.status === 200 || response.status === 201) {



                    setCustomers({ customerid: 0, firstname: "", lastname: "", email: "", phone: "", state: "", zipcode: "", address: "" })
                    enqueueSnackbar("customer deleted successfully", { variant: "success" })
                    setCustomers(prevCustomers => {
                        const updatedCustomers = prevCustomers.filter((customer) =>
                            customer.customerid !== id
                        );
                        return updatedCustomers;
                    });
                }

            })
            .catch((err) => {
                console.log("Error deleting  customer" + err)
            })
    }
    function editCustomer(id) {
        axios.put(`http://localhost:5555/customers/customer/${id}`, customer)
            .then((response) => {
                console.log("seccussfully updated")
                if (response.status === 200 || response.status === 201) {
                    setCustomers(prevCustomers => {
                        const updatedCustomers = prevCustomers.map((cus) =>
                            cus.customerid === id ? customer : cus
                        );

                        return updatedCustomers;
                    });
                setCustomers({ customerid: 0, firstname: "", lastname: "", email: "", phone: "", state: "", zipcode: "", address: "" })
                enqueueSnackbar("customer updated successfully", { variant: "success" })
                }
            })
            .catch((err) => {
                console.log("Error updating  customer" + err)
            })
    }
    return (
        <div>
            <div className="w-full h-screen bg-white shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
                <SideBar />
                <div className="flex-1 px-2 bg-gray-100">
                    <div className="h-16 text-center">
                        <h4 className="text-4xl text-center font-bold py-5 m-3">CUSTOMERS</h4>
                    </div>
                    <section className="dark:bg-gray-100 dark:text-gray-800  bg-gray-300">
                        <div className="container flex flex-col-reverse mx-auto lg:flex-row">
                            <div className="lg:w-1/2 xl:w-3/5 dark:bg-gray-100">
                                <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                                    <table className='w-full border-separate border-spacing-2 '>
                                        <thead>
                                            <tr className="">
                                                <th className=''>ID</th>
                                                <th className=''>Firstname</th>
                                                <th className=''>Lastname</th>
                                                <th className=''>Tel</th>
                                                <th className=''>Email</th>
                                                <th className=''>Address</th>
                                                <th className=''>Operations</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers.map(customer => {
                                                return <tr key={customer.customerid}>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.customerid}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.firstname}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.lastname}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.phone}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.email}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">{customer.address}</td>
                                                    <td className="border border-slate-700 rounded-md text-center">
                                                        <button type="button" className="border border-blue-700 rounded-md text-center text-sm px-5 py-1 me-2 mb-2" onClick={() => showDetail(customer)}>Details</button>

                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5">

                                <form className="w-full">
                                    <div className="mb-2">
                                        <input type="number" name='customerid' value={customer.customerid} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="ID" onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" name='firstname' value={customer.firstname} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="Firstname" onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" name='lastname' value={customer.lastname} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="Lastname" onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" name='phone' value={customer.phone} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="Tel" onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="email" name='email' value={customer.email} id="email" className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="Email" onChange={handleChange} />
                                    </div>
                                    <div className="mb-2">
                                        <input type="text" name='address' value={customer.address} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="Address" onChange={handleChange} />
                                    </div>

                                    <div className="">
                                        <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ml-10 mr-4 w-[100px]  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addCustomer}>Add</button>
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mr-4 w-[100px] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => editCustomer(customer.customerid)}>Edit</button>
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  w-[100px] px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => deleteCustomer(customer.customerid)}>Remove</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </section>
                    <section className='m-4 md:m-8 dark:bg-gray-100 dark:text-gray-800'>
                        <div className='container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">Orders Count</h5>
                                <p className="mb-3 font-normal text-center text-2xl">{count}</p></div>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">Total Orders Amount</h5>
                                <p className="mb-3 font-normal text-center text-2xl">{count !== 0 ? detail.totalamount : 0}</p></div>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">Last Orders Date</h5>
                                <p className="mb-3 font-normal text-center text-2xl">{count !== 0 ? detail.orderdate : 0}</p></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Customers