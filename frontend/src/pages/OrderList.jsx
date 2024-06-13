import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar'
import axios from 'axios'
import { enqueueSnackbar } from "notistack"
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'
import Invoice from '../components/product modals/Invoice'
const OrderList = () => {
    const [orderList, setOrderList] = useState([])
    const [viewDetail, setviewDetail] = useState([])
    const [invoice, setInvoice] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showInvoice , setShowInvoive] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:5555/orders/orderlist")
            .then(response => {
                console.log()
                setOrderList(response.data.data)
                console.log(response.data.data)
            })
            .catch(err => {
                console.log("err frtching list of orders" + err)
            })
    }, [])
    // Calculate the current list to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentList = orderList.slice(indexOfFirstItem, indexOfLastItem);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function viewDetailOrder(orderid) {
        axios.get(`http://localhost:5555/orders/orderlist/orderdetail/${orderid}`)
            .then(response => {
                console.log()
                console.log(response.data.data)
                setviewDetail(response.data.data)
            })
            .catch(err => {
                console.log("err frtching list of orders" + err)
            })
    }
    function getInvoice(orderid){
        axios.get(`http://localhost:5555/orders/orderlist/invoice/${orderid}`)
        .then(response => {
            if(response.status===201){
                setInvoice(response.data.data)
                console.log(response.data.data)
                setShowInvoive(true)
            }                
        })
        .catch(err => {
            console.log("err frtching list of orders" + err)
        })
    }
    return (
        <div>
            <div className="w-full h-screen bg-white shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
                <SideBar />
                <div className="flex-1 px-2 bg-gray-100">
                    <div className="h-16 text-center">
                        <h4 className="text-4xl text-center font-bold py-5 m-3">ORDERS List</h4>
                    </div>
                    <div>
                        <h3 className="text-xl mt-3">Orders List</h3>
                    </div>


                    <section className=''>
                        {/* <h3 className="text-2xl">Customer Name</h3> */}
                        <table className='w-full border-separate border-spacing-2 mt-4'>
                            <thead>
                                <tr className="">
                                    <th className=''>Order ID</th>
                                    <th className=''>Customer ID</th>
                                    <th className=''>Customer</th>
                                    <th className=''>Total</th>
                                    <th className=''>Date</th>
                                    <th className=''>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentList.map(orderitem => {
                                    return <tr key={orderitem.orderid}>
                                        <td className="border border-slate-700 rounded-md text-center">{orderitem.orderid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{orderitem.customerid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{orderitem.firstname} {orderitem.lastname}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{orderitem.totalamount}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{orderitem.orderdate}</td>
                                        <td className="border border-slate-700 rounded-md text-center">
                                            <button type="button" className=" bg-gray-700 text-white rounded-md text-center text-sm px-5 py-1 me-2 mb-2" onClick={() => viewDetailOrder(orderitem.orderid)}>view detail</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <section className="pagination">
                            <Pagination
                                length={orderList.length}
                                itemsPerPage={itemsPerPage}
                                handlePagination={handlePagination}
                            />
                        </section>
                    </section>
                    <section>
                        <h3>Order: {viewDetail.orderid} # </h3>
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
                                {viewDetail.map((detail) => {
                                    return <tr key={detail.productid}>
                                        <td className="border border-slate-700 rounded-md text-center">{detail.productid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{detail.productname}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{detail.quantity}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{detail.price}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{detail.quantity * detail.price}</td>
                                    </tr>

                                })}

                            </tbody>
                        </table>
                        <div className='w-full text-2xl flex justify-center bg-gray-200'>{}</div>
                        <div className="flex w-full justify-center items-center bg-gray-300 p-2 text-2xl bold">
                            <div>
                                <button type="button" className="border border-blue-700 bg-blue-700 rounded-md text-center  px-5 py-1 me-2 mb-2 text-lg w-full" onClick={()=>getInvoice(viewDetail[0].orderid)}>Generate Invoice</button>
                                
                            </div>
                            <div>

                            </div>
                        </div>
                    </section>
                </div>


            </div>

      {
        showInvoice && <Invoice invoice={invoice}  onClose={()=>setShowInvoive(false)}/>
      }
        </div>
    )
}


export default OrderList