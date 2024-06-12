import { useState, useEffect, useContext } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import Modal from '../components/product modals/Modal';
import { CategoryContext , ProductContext} from '../App';
import DeleteModal from '../components/product modals/DeleteModal';
import EditModal from '../components/product modals/EditModal';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState({ status: false, id: 0 })
    const [editMode , setEditMode] = useState({status : false , product:{} , id:0});
    const {isProductsUpadted , setIsProductsUpdated , notRemainedProducts} = useContext(ProductContext);
    useEffect(() => {
        setProducts(isProductsUpadted)
        // axios.get("http://localhost:5555/products")
        //     .then(response => {
        //         setProducts(response.data.data)
        //     })
        //     .catch((err) => {
        //         console.log("Error getting products" + err)
        //     })
    }, [])


    function addProduct(product) {
        console.log("Attempting to add product:", product);

        const { categoryname } = product;
        const category = isCategoryUpdated.categories.find(cate => cate.categoryname === categoryname);

        if (!category) {
            enqueueSnackbar("Category not found", { variant: "error" });
            return;
        }

        const newProduct = {
            ...product,
            categoryid: category.categoryid,
        };

        axios.post("http://localhost:5555/products/product", newProduct)
            .then(response => {
                console.log("Response from server:", response);
                if (response.status === 200 || response.status === 204) {
                    setProducts(prevValues => {
                        const updatedProducts = [...prevValues, newProduct];
                        console.log("Updated products state:", updatedProducts);
                        return updatedProducts;
                    });
                    setShowModal(false);
                    console.log("Modal should be closed now");
                    enqueueSnackbar("Product added successfully", { variant: "success" });
                } else {
                    console.log("Unexpected response status:", response.status);
                    enqueueSnackbar("Unexpected response from server", { variant: "warning" });
                }
            })
            .catch((err) => {
                console.log("Error adding product:", err);
                enqueueSnackbar("Error adding product", { variant: "error" });
            });
    }

    function deleteProduct(id) {
        axios.delete(`http://localhost:5555/products/product/${id}`)
            .then(response => {
                console.log("Response from server:", response);
                if (response.status === 201) {
                    setProducts(prevProducts => {
                        const updatedProducts = prevProducts.filter((cate) =>
                            cate.productid !== id
                        );

                        return updatedProducts;
                    });
                    setDeleteModal({ status: false, id: 0 })
                    console.log("Modal should be closed now");
                    enqueueSnackbar("Product deleted successfully", { variant: "success" });
                } else {
                    console.log("Unexpected response status:", response.status);
                    enqueueSnackbar("Unexpected response from server", { variant: "warning" });
                }
            }).catch((err) => {
                console.log("Error deleting  product" + err)
            })
    }

    function editProduct(product , id) {
        const { categoryname } = product;
        const category = isCategoryUpdated.categories.find(cate => cate.categoryname === categoryname);

        if (!category) {
            enqueueSnackbar("Category not found", { variant: "error" });
            return;
        }

        const newProduct = {
            ...product,
            categoryid: category.categoryid,
        };
        axios.put(`http://localhost:5555/products/product/${id}` , newProduct)
            .then(response => {
                if(response.status===201){
                    setProducts(prevProducts => {
                        const updatedProducts = prevProducts.map((pro) => 
                            pro.productid === id ? newProduct : pro
                        );
                        
                        return updatedProducts;
                    });
                    setEditMode({status:false , product :{} , id:0});
                    enqueueSnackbar("updated product",{variant:"success"});

                }else{
                    enqueueSnackbar("Error while updating" , {variant:"error"})
                }
                  
            }).catch((err) => {
                console.log("Error updateing  product" + err)
            })
    }
    return (
        <div>
            <div className="w-full h-screen bg-white shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
                <SideBar />
                <div className="flex-1 px-2 bg-gray-100">
                    <div className="h-16 text-center">
                        <h4 className="text-4xl text-center font-bold py-5 m-3">PRODUCTS</h4>
                    </div>

                    <div className="w-full flex justify-between border border-gray-300 rounded-lg mt-10 py-5">
                        <h3 className="text-xl mt-3">Products</h3>
                        <div className="flex justify-between items-center">
                            <input className="w-full bg-gray-100 text-gray-900 mt-2 p-2 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline"
                                type="number" placeholder="ID*" />
                            <button className='mr-3 ml-10 w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Search</button>
                        </div>
                        <div className="">
                            <button type="button" className="mr-3 ml-10 w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setShowModal(true)}>Add</button>
                        </div>

                    </div>
                    <section>
                        <h3 className="text-2xl">Products List</h3>
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
                                    <th className=''>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => {
                                    return <tr key={product.productid}>
                                        <td className="border border-slate-700 rounded-md text-center">{product.productid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">image</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.productname}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.categoryid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.description}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.stockquantity}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{product.price}</td>
                                        <td className="border border-slate-700 rounded-md text-center">
                                            <button type="button" className="border border-blue-700 rounded-md text-center text-sm px-5 py-1 me-2 mb-2" onClick={()=>setEditMode({status:true , product:product , id:product.productid})}>Edit</button>
                                            <button type="button" className="border border-blue-700 rounded-md text-center text-sm px-5 py-1 me-2 mb-2" onClick={() => setDeleteModal({ status: true, id: product.productid })}>Remove</button>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </section>

                </div>


            </div>

            {
                showModal && <Modal onClose={() => setShowModal(false)} categories={isCategoryUpdated.categories} addProduct={addProduct} />

            }
            {
                deleteModal.status && <DeleteModal onClose={() => setDeleteModal({ status: false, id: 0 })}  deleteProduct={() => deleteProduct(deleteModal.id)} />
            }
            {
                editMode.status && <EditModal edit={true} categories={isCategoryUpdated.categories} updatedProduct={editMode.product} onClose={() => setEditMode({ status: false, product: {} , id:0})}  editProduct={editProduct} />
            }
        </div>
    )
}

export default Products