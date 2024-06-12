import { useState, useEffect,useContext } from 'react'
import SideBar from '../components/SideBar'
import ShowProducts from '../components/order modals/ShowProducts';
import ShowCustomers from '../components/order modals/ShowCustomers';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from "notistack"
import axios from 'axios';
import { ProductContext } from '../App';
const Orders = () => {
    const [productsModal, setproductsModal] = useState(false);
    const [customersModal, setcustomersModal] = useState(false);
    const [orderdProducts, setOrdersProducts] = useState([]);
    const [customerOrderedBy, setCustomerOrderedBy] = useState({});
    const [updatedQuantity , setUpdatedQuantity] = useState([])
    const [totalAmount, setTotalAmount] = useState()
    const {isProductsUpadted , setIsProductsUpdated , notRemainedProducts , setNotRemainedProducts} = useContext(ProductContext);
    const calculateTotalAmount = (products) => {
        return products.reduce((sum, product) => sum + (Math.floor(product.total) || 0), 0);
    };

    console.log(orderdProducts)
    // Update total amount whenever orderdProducts changes
    useEffect(() => {
        setTotalAmount(calculateTotalAmount(orderdProducts));
    }, [orderdProducts]);


    function removeOrderedProduct(id) {
        setOrdersProducts(prevOrderedProducts => {
            return prevOrderedProducts.filter(pro => {
                return pro.productid !== id;
            })
        })
       
     
        setUpdatedQuantity(prevUpdated=>{
            const updated=  prevUpdated.filter(product=>{
                return  product.productid !== id 
              })
              
             return updated;
          })
    }
    function clearOrder() {
        setCustomerOrderedBy({})
        setOrdersProducts([])
    }
    function handlerquantityChnage(e, index , productid) {
        const { value } = e.target;
        const newRows = [...orderdProducts]
        // const newValue = value >newRows[index].quantity ? newRows[index].stockquantity : value
        // value > newRows[index].stockquantity && enqueueSnackbar("Only "+ newRows[index].stockquantity+ " remained" , {variant:"warning"})
        newRows[index].quantity =   value
        newRows[index].total = value * newRows[index].price
        // newRows[index].remainedQuantity--;
        setOrdersProducts(newRows);
        const stockRemained=(newRows[index].stockquantity- newRows[index].quantity );
        console.log(newRows[index].quantity)
        console.log(stockRemained)
        const updatedproduct = {productid:productid , remainedQuantity:stockRemained}
        setUpdatedQuantity(prevUpdated=>{
          const updated=  prevUpdated.filter(product=>{
              return  product.productid !== productid 
            })
            return [
                ...updated  ,
                updatedproduct
            ]
        })
        setIsProductsUpdated(prevUpdated=>{
            console.log(prevUpdated.products)
            const stockUpdated = prevUpdated.map(product=>{
               const newproduct={
                ...product,
                stockquantity : stockRemained
               }
            return   product.productid ===productid ? newproduct: product;
               
             })
            return stockUpdated;
            
        })
    }
    function orderNow() {
        if (orderdProducts.length === 0) {
            enqueueSnackbar("Select at leats a product", { variant: "warning" })
        }
        else if (customerOrderedBy.firstname === undefined) {
            enqueueSnackbar("Select a customer", { variant: "warning" })
        }
        else {
            axios.post(`http://localhost:5555/orders/order`, {totalAmount:totalAmount , customerID: customerOrderedBy.customerid , orderdProducts:[...orderdProducts] , updatedQuantity})
            .then((response) => {
               if(response.status ===201){
                enqueueSnackbar("order successed" , {variant:"success"})
               }
              setIsProductsUpdated(prevProducts=>{
                return prevProducts.filter(product=>{
                    return product.stockquantity !== 0
                })
              })
            
              setNotRemainedProducts(prevProducts=>{
                return prevProducts.filter(product=>{
                    return product.stockquantity === 0
                })
              })
            })
            .catch((err) => {
                console.log("Error ordering" + err)
            })
          
        }
    }
    return (
        <div>
            <div className="w-full h-screen bg-white shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
                <SideBar />
                <div className="flex-1 px-2 bg-gray-100">
                    <div className="h-16 text-center">
                        <h4 className="text-4xl text-center font-bold py-5 m-3">ORDERS</h4>
                    </div>
                    <div>
                        <h3 className="text-xl mt-3">Orders</h3>
                    </div>

                    <div className="w-full flex justify-between border border-gray-300 rounded-lg mt-10 py-5">
                        <div className="flex justify-between items-center">

                            <button className='mr-3 ml-10 w-[200px] text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800' onClick={() => setcustomersModal(true)}>Add customer</button>
                            <button className='mr-3 ml-10 w-[200px] text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800' onClick={() => setproductsModal(true)}>Add product</button>
                            <button className='mr-3 ml-10 w-[200px] text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800' onClick={clearOrder}>Clear</button>
                            <button className='mr-3 ml-10 w-[200px] text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800'><Link to='/orderlist'>Orders List</Link></button>

                        </div>
                        <div className="">

                        </div>

                    </div>

                    <section className=''>
                        <h3 className="text-2xl">Customer ##: {customerOrderedBy.firstname}</h3>
                        <table className='w-full border-separate border-spacing-2 mt-4'>
                            <thead>
                                <tr className="">
                                    <th className=''>ID</th>
                                    <th className=''>Product</th>
                                    <th className=''>Quantity</th>
                                    {/* <th className=''>Remaied quantity</th> */}
                                    <th className=''>Price</th>
                                    <th className=''>Total</th>
                                    <th className=''>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderdProducts.map((orderdProduct, index) => {
                                    {/* setQuantityTotal({quantity:orderdProduct.quantity , price:orderdProduct.price}) */ }
                                    return <tr key={orderdProduct.productid} >
                                        <td className="border border-slate-700 rounded-md text-center">{orderdProduct.productid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{orderdProduct.productname}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            <input type="number" name='quantity' min='1' max={orderdProduct.stockquantity} placeholder='Quantity' className='bg-transparent outline-none text-center' value={orderdProduct.quantity} onChange={()=>handlerquantityChnage(event, index , orderdProduct.productid)} />
                                        </td>
                                        {/* <td className='border border-slate-700 rounded-md text-center'>
                                            <input type="text" name='remainedquantiity' value={orderdProduct.remainedQuantity} placeholder='remained' className='bg-transparent outline-none text-center' />

                                        </td> */}
                                        <td className="border border-slate-700 rounded-md text-center">{orderdProduct.price}</td>
                                        <td className='border border-slate-700 rounded-md text-center'>
                                            <input type="text" name='total' value={orderdProduct.total} placeholder='Total' className='bg-transparent outline-none text-center' />

                                        </td>
                                        <td className="border border-slate-700 rounded-md text-center">
                                            <button type="button" className=" bg-red-700 rounded-md text-center text-sm px-5 py-1 me-2 mb-2" onClick={() => removeOrderedProduct(orderdProduct.productid)}>Remove</button>
                                        </td>
                                    </tr>
                                    
                                })}

                            </tbody>
                        </table>
                        <div className="flex w-full justify-between items-center bg-gray-300 p-2 text-2xl bold">
                            <div>
                                <h3>Total Order Value: </h3>
                            </div>
                            <div>

                                <h3>{" $" + totalAmount + ",000"}</h3>
                            </div>
                            <div>
                                <button type="button" className="border border-blue-700 bg-blue-700 rounded-md text-center text-sm px-5 py-1 me-2 mb-2 text-2xl" onClick={orderNow}>Order Now</button>

                            </div>
                        </div>
                    </section>

                </div>


            </div>
            {productsModal && <ShowProducts onClose={() => setproductsModal(false)} orderdProducts={orderdProducts} setOrdersProducts={setOrdersProducts} setTotalAmount={setTotalAmount}  setUpdatedQuantity={setUpdatedQuantity}/>}
            {customersModal && <ShowCustomers onClose={() => setcustomersModal(false)} customerOrderedBy={customerOrderedBy} setCustomerOrderedBy={setCustomerOrderedBy} />}

        </div>
    )
}

export default Orders