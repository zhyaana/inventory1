import { useState, useEffect ,useContext} from "react"
import SideBar from "../components/SideBar"
import axios from "axios"
import { enqueueSnackbar } from "notistack"
import { CategoryContext } from "../App"
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({index:"", categoryid: "", categoryname: "" });
    const {isCategoryUpdated , setIsCategoryUpdated} = useContext(CategoryContext);
    console.log(isCategoryUpdated)
    useEffect(() => {
        axios.get("http://localhost:5555/Categories")
            .then(response => {
                setCategories(response.data.data)
            })
            .catch((err) => {
                console.log("Error getting categoris" + err)
            })
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setCategory(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }

        })
    }

    function viewCategory(category , index) {
        const cat= {
            index,
            ...category 
        }
        setCategory(cat)
    }
    function addCategory(){
        let intendedName = categories.map((cate)=>{
          return  cate.categoryname === category.categoryname ? false : true
        })
       
        if( category.categoryname == ""){
            enqueueSnackbar("Category name is required" , {variant: "warning"}) 
        }else
        {
            axios.post(`http://localhost:5555/Categories/category` , category)
            .then(() => {
              console.log("seccussfully added")
              setCategories(prevCategories => {
                const updatedCategories = [...prevCategories , category];
                setIsCategoryUpdated(prevValue=>{
                    return{
                        ...prevValue,
                        count:updatedCategories.length
                    }
                })
                return updatedCategories
                });
            // setIsCategoryUpdated({count:categories.length , status:true})
            setCategory({index:"", categoryid: "", categoryname: "" })
              enqueueSnackbar("Category added successfully" , {variant: "success"})  
                    
            })
            .catch((err) => {
                console.log("Error added  categoris" + err)
            })
        }
        
    }
    function editCategory(id){
        axios.put(`http://localhost:5555/Categories/category/${id}` , category)
        .then(() => {
          console.log("seccussfully edited")
          setCategories(prevCategories => {
            const updatedCategories = prevCategories.map((cate) => 
                cate.categoryid === id ? category : cate
            );
            
            return updatedCategories;
        });
        setCategory({index:"", categoryid: "", categoryname: "" })
          enqueueSnackbar("Category Edited successfully" , {variant: "success"})        
        })
        .catch((err) => {
            console.log("Error editing  categoris" + err)
        })
    }

    function deleteCategory(id){
        axios.delete(`http://localhost:5555/Categories/category/${id}`)
        .then(() => {
          console.log("seccussfully deleted")
          setCategories(prevCategories => {
            const updatedCategories = prevCategories.filter((cate) => 
               cate.categoryid !== id 
            );
            setIsCategoryUpdated(prevValue=>{
                return{
                    ...prevValue,
                    count:updatedCategories.length
                }
            })
            return updatedCategories;
        });
        
        setCategory({index:"", categoryid: "", categoryname: "" })
          enqueueSnackbar("Category deleted successfully" , {variant: "success"})
                 
        })
        .catch((err) => {
            console.log("Error deleting  categoris" + err)
        })
    }

    return (
        <div>
            <div className="w-full h-screen bg-white shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
                <SideBar />
                <div className="flex-1 px-2 bg-gray-100">
                    <div className="h-16 text-center">
                        <h4 className="text-4xl text-center font-bold py-5 m-3">CATEGORIES {isCategoryUpdated.count}</h4>
                    </div>
                    <div className="">
                        <div className="border border-gray-300 rounded-lg mt-10 py-5">
                            <h3 className="text-xl mt-3">Manage</h3>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5 p-4">
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg outline outline-1 focus:outline-none  focus:shadow-outline"
                                    type="number" placeholder="ID*" name="categoryid" value={category.categoryid} onChange={handleChange} />
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg  outline outline-1 focus:outline-none focus:shadow-outline"
                                    type="text" placeholder="Name*" name="categoryname" value={category.categoryname} onChange={handleChange} />
                            </div>
                            <div className="flex items-center">
                                <button type="button" className="mr-3 ml-10 w-[400px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>addCategory()}>Add</button>
                                <button type="button" className="w-[400px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => editCategory(category.categoryid)}>Edit</button>
                                <button type="button" className="w-[400px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => deleteCategory(category.categoryid)}>Remove</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl">Categories List</h3>
                        <table className='w-full border-separate border-spacing-2 mt-4'>
                            <thead>
                                <tr className="">
                                    <th className=''>ID</th>
                                    <th className=''>Name</th>
                                    <th className=''>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category , index) => {
                                    return <tr key={category.categoryid}>
                                        <td className="border border-slate-700 rounded-md text-center">{category.categoryid}</td>
                                        <td className="border border-slate-700 rounded-md text-center">{category.categoryname}</td>
                                        <td className="border border-slate-700 rounded-md text-center">
                                            <button type="button" className="border border-blue-700 rounded-md text-center text-sm px-5 py-1 me-2 mb-2" onClick={() => viewCategory(category ,index)}>View details</button>
                                        </td>
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

export default Categories