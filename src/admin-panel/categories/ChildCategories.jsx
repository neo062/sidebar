import React, { useState, useEffect } from 'react'
import ChildCategoriesRow from './ChildCategoriesRow';
import ChildCategoriesModal from './ChildCategoriesModal';
const BASE_URL = "https://two1genx.onrender.com";

const ChildCategories = () => {
    // state for modal
    const [childModal, setChildModal] = useState(false)
    // For Closing Modal
    const handleClose = () => {
        setChildModal(false)
    }
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);

    const fetchData = async () => {
        // Perform an API call to retrieve paginated data
        // Adjust the API endpoint and parameters as per your application's needs
        const response = await fetch(`${BASE_URL}/v1/categories/get-populated?filter[category_type][$eq]=child&page=${currentPage}&limit=${pageSize}&sort=-createdAt`);
        const data = await response.json();
        console.log(data);
        setItems(data.categoryList);
        setTotalItems(data.totalCount);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(totalItems / pageSize);
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

        return (
            <div className='flex justify-end pb-5 '>
                <div className='flex items-center border border-solid border-[#EEEEEE] rounded-md '>
                    <button
                        className='flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]'
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>

                    </button>

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            className={`flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]  ${page === currentPage ? 'bg-[#4285F4] text-gray-900' : 'text-[#222222]'}`}
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className='flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]'
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="px-20 py-10 text-sm font-semibold">
            {childModal &&
                <ChildCategoriesModal
                    visible={childModal}
                    onClose={handleClose}
                />}
            <div>
                <div className="flex items-center py-3">
                    <a href="/admin-panel/admin-categories"> <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg></a>
                    <p className="text-2xl">Child Categories</p>
                </div>
                <div className="flex px-4 text-[#0056fe] tex-xs">
                    Categories &gt; ChildCategories
                </div>
            </div>
            <div className="flex items-center justify-between mt-5">
                <div className='flex gap-x-5'>
                    <div className='flex'>
                        {/* // Search 1 */}
                        <form className='flex items-center'>
                            <label className='mr-2 text-sm'>Parent Categories</label>
                            <div className='flex items-center p-1 gap-x-1 rounded-lg border border-solid border-[#9D9D9D]'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                                <input className='py-1 px-1 outline-0' type='text' /></div>
                        </form>
                        {/* // Search 2 */}
                    </div>
                    <div className='flex'>
                        <form className='flex items-center'>
                            <label className='mr-2 text-sm'>Sub Categories</label>
                            <div className='flex items-center p-1 gap-x-1 rounded-lg border border-solid border-[#9D9D9D]'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                                <input className='py-1 px-1 outline-0' type='text' /></div>
                        </form>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='flex-col'>
                        <div
                            onClick={() => setChildModal(true)}
                            className='flex items-center'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p >Add New Child Category</p>

                        </div>
                        <div className="flex gap-x-1">
                            <a href="/admin-panel/admin-subCategories" className="text-left text-xs text-teal-500 py-1 ">Sub-Category</a>
                            <a href="/admin-panel/admin-parent" className="text-left text-xs text-teal-500 py-1 ">Parent-Category</a>
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="max-w-6xl mx-auto overflow-x-scroll rounded-t-xl my-5">
                    <table className="table min-w-full border  border-solid">
                        <thead className="bg-[#e5f2f4]">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                                >
                                    Sl no.
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                                >
                                    Child Category
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                                >
                                    Parent Category
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                                >
                                    Sub- Category
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                                >
                                    Category ID
                                </th>

                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
                                >
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                items &&
                                items.map((categories, index) => (
                                    <ChildCategoriesRow
                                        key={categories._id}
                                        id={categories._id}
                                        srNo={index + 1}
                                        child={categories.category_name}
                                        parent={categories?.parent_category_id?.category_name}
                                        sub={categories.sub_category_id.category_name}
                                        categoriesId={categories.category_slug}
                                        desc={categories.category_desc}

                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {renderPagination()}
            </section>
        </div>
    )
}

export default ChildCategories