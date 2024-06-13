import { useState , useEffect , useContext } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import {enqueueSnackbar} from "notistack"
import { ProductContext } from "../../App";
import Pagination from "../Pagination";
const ShowProducts = ({onClose , setOrdersProducts , orderdProducts }) => {
    const [products ,  setProducts] = useState([]);
    const [currentPage , setCurrentPage] = useState(1)
    const [itemsPerPage , setItemsPerPage] = useState(4)
    const {isProductsUpadted} = useContext(ProductContext)

    useEffect(() => {
        setProducts(isProductsUpadted)
    }, [])
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentList = products.slice(indexOfFirstItem, indexOfLastItem);
 
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
 
function selectProduct(product){
 const isOrdered = orderdProducts.find(orderedProducts=>{
   return orderedProducts.productid !== product.productid ? false : true
 })
 
 if(!isOrdered){
    const updatedProduct = {...product , quantity: 1 , total :product.price , stockquantity:product.stockquantity}
    setOrdersProducts(prevOrders=>{
        return [...prevOrders , updatedProduct];
    })
 }
 else{
    console.log("is already orderd")
    enqueueSnackbar("You already ordered that product" , {variant:"warning"})
 }

}
    return (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4  w-3/5  max-h-full ">
 
                <div className="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                           Select a Product
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={onClose}>
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>

                    <div className="p-4 md:p-5 bg-white">
                    <table className='w-full border-separate border-spacing-2 mt-4'>
                            <thead>
                                <tr className="">
                                    <th className=''>ID</th>
                                    <th className=''>Picture</th>
                                    <th className=''>Name</th>
                                    <th className=''>Category</th>
                                    <th className=''>Description</th>
                                    <th className=''>Quantity</th>
                                    <th className=''>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentList.map(product => {
                                    return <tr key={product.productid} className={product.stockquantity<1 ?" bg-gray-100 cursor-not-allowed" :"hover:bg-gray-100 cursor-pointer"} onClick={()=>selectProduct(product)}>
                                        <td className="border border-slate-700 rounded-md text-center">{product.productid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">image</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.productname}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.categoryid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.description}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.stockquantity}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.price}</td>
                                     
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                    <section className="flex justify-center">
                    <Pagination itemsPerPage={itemsPerPage} length={products.length} handlePagination={handlePagination}/>
                    </section>
                </div>
            </div>
        </div>

    )
}

export default ShowProducts