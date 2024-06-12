import { useState } from "react";
import { IoMdClose } from "react-icons/io";
const Modal = ({ addProduct, onClose, categories }) => {
    const [product, setProduct] = useState({ productname: "", categoryname: "", price: 0, stockquantity: 0, image: "", description: "" })
    function handlerChange(e) {
     const {name , value} = e.target;
     setProduct(prevValue=>{
        return{
            ...prevValue,
            [name] : value
        }
     })
    }
    return (

        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4  max-w-md w-[1200px] max-h-full ">

                <div className="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add a product
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={onClose}>
                            <IoMdClose className="text-2xl" />
                        </button>
                    </div>

                    <div className="p-4 md:p-5 bg-white">
                        <form className="space-y-4" action="#">

                            <div className="mb-2">
                                <input type="text" name="productname" value={product.productname} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="name" onChange={handlerChange} />
                            </div>
                            <div className="mb-2">
                                <select name="categoryname" value={product.categoryname} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" onChange={handlerChange}>
                                    <option value="">Select category</option>
                                    {categories.map((cate, index) => {
                                        return <option value={cate.categoryname} key={index}>{cate.categoryname}</option>
                                    })}
                                </select>
                            </div>
                            <div className="mb-2">
                                <input type="number" name="stockquantity" value={product.stockquantity} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="quantity" onChange={handlerChange} />
                            </div>
                            <div className="mb-2">
                                <input type="text" name="description" value={product.description} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="description" onChange={handlerChange} />
                            </div>
                            <div className="mb-2">
                                <input type="text" name="price" value={product.price} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="price" onChange={handlerChange} />
                            </div>
                            <div className="mb-2">

                            </div>
                            <div className="mb-2">
                                <label htmlFor="">Product image</label>
                                <input type="file" name="image" value={product.image} className="bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline block w-full p-2.5" placeholder="Address" onChange={handlerChange} />
                            </div>
                            <div className="mb-5">
                                <button type="button" className="mr-3 ml-10 w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => addProduct(product)}>Add</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Modal