import React, { useEffect, useState } from 'react'
import CouponsTableRow from './CouponsTableRow'
const BASE_URL = "https://two1genx.onrender.com";

const CouponsList = (props) => {
    const { handleClick } = props
    const [data, setData] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const handleEdit = (id, type) => {

        if (type === 'edit') {
            handleClick(id)
            console.log(type);
        } else if (type === 'delete') {
            setIsClicked((preValue) => !preValue)
            console.log(type);
        } else if (type === 'status') {
            setIsClicked((preValue) => !preValue)
        }
        // console.log(id)
    }

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize, isClicked]);

    const fetchData = async () => {
        // Perform an API call to retrieve paginated data
        // Adjust the API endpoint and parameters as per your application's needs
        const response = await fetch(`${BASE_URL}/v1/coupon/paginate-coupon?page=${currentPage}&pageSize=${pageSize}`);
        const data = await response.json();
        console.log(data?.pageInfo?.totalCoupons);
        setItems(data?.coupons);
        setTotalItems(data?.pageInfo?.totalCoupons);
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
            <div className='flex justify-end'>
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
                            className={`flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]  ${page === currentPage ? 'bg-[#4285F4] text-white' : 'text-[#222222]'}`}
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


    console.log(data);
    return (
        <section>
            <div className='flex justify-between py-5'>
                <div className='text-base text-gray-700 font-normal'>{
                    ` Showing 1 to ${items.length} of ${totalItems} results`}
                </div>
                <div
                    onClick={() => handleClick()}
                    className='text-base text-gray-700 font-normal cursor-pointer'>
                    <span className='text-xl font-bold'>+</span>  Add New
                </div>
            </div>

            {/* // Table Section */}

            <div class="relative overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="bg-white text-xs font-bold border-b border-solid border-gray-200 text-gray-900">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-xs">Code</th>
                            <th scope="col" class="px-6 py-3 text-xs">Type</th>
                            <th scope="col" class="px-6 py-3 text-xs">Description</th>
                            <th scope="col" class="px-6 py-3 text-xs">Amount</th>
                            <th scope="col" class="px-6 py-3 text-xs">Used</th>
                            <th scope="col" class="px-6 py-3 text-xs">Status</th>
                            <th scope="col" class="px-6 py-3 text-xs">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, index) => (
                                <CouponsTableRow
                                    key={index}
                                    id={item._id}
                                    code={item.coupon_code}
                                    type={item.discount_type}
                                    amount={item.discount}
                                    description={item.description}
                                    isActive={item.isActive}
                                    used={item.Used}
                                    discount_type={item.discount_type}
                                    handleEdit={handleEdit}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='py-5'>

                {renderPagination()}
            </div>
        </section>
    )
}

export default CouponsList