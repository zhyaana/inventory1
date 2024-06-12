import { useContext } from 'react';
import SideBar from '../components/SideBar'
import NavBar from '../components/home/NavBar'
import { TbPackages } from "react-icons/tb";
import { CategoryContext , ProductContext } from '../App';

const Home = () => {
    const {isCategoryUpdated , setIsCategoryUpdated} = useContext(CategoryContext);
    const {isProductsUpadted , setIsProductsUpdated , notRemainedProducts} = useContext(ProductContext);
    return (
        <div>
            <div className="w-full  h-screen bg-black shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
                <SideBar />
                <div className="flex-1 px-2 bg-gray-100">
                   <section className='mb-10'>
                    <NavBar/>
                   </section>
                    <section className='m-4 md:m-8 mt-10 dark:bg-gray-100 dark:text-gray-800 grid h-[500px]  m-auto justify-center items-center'>
                        <div className='container w-[900px] mx-auto grid justify-center  gap-4 sm:grid-cols-2 lg:grid-cols-2'>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  text-center'> 
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">Total Products</h5>
                            {/* <div className='block text-7xl text-center'><TbPackages className='text-center text-gold-400'/></div> */}
                            <p className="mb-3 font-normal text-center text-2xl">{isProductsUpadted.length}</p></div>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'> 
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">Total Categories </h5>
                            <p className="mb-3 font-normal text-center text-2xl">{isCategoryUpdated.count}</p></div>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'> 
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">Total Customers</h5>
                            <p className="mb-3 font-normal text-center text-2xl">2</p></div>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'> 
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">Total Orders </h5>
                            <p className="mb-3 font-normal text-center text-2xl">2</p></div>
                            <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'> 
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center">not remainded </h5>
                            <p className="mb-3 font-normal text-center text-2xl">{notRemainedProducts.length}</p></div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    )
}

export default Home
