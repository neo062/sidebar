import React, { useState } from 'react'
import ReviewModal from './ReviewModal'
import RaiseQueryModal from './RaiseQueryModal'
const TableRow = ({ data, index, handleRefresh }) => {
    const { product_images, seller, product_description, parent_category, sub_category, child_category, review_status, _id } = data

    // state for Review Modal
    const [reviewModal, setReviewModal] = useState(false)
    //state for Querry Modal
    const [querryModal, setQuerryModal] = useState(false)
    const handleClose = () => {
        handleRefresh()
        setQuerryModal(false)
        setReviewModal(false)
    }
    const [expanded, setExpanded] = useState(false);
    const limit = 60;
    const slicedContent = product_description?.slice(0, limit);
    const displayContent = expanded ? product_description : slicedContent;

    console.log(reviewModal);
    return (
        <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#333333] text-xs">
            <td scope="row" class="whitespace-nowrap px-2 py-2  ">{index + 1}</td>
            <td class="px-2 py-2 capitalize">
                <div className='w-12 h-16'>
                    <img className='w-full h-full object-fill' src={product_images[0]?.main_img} alt='product_img' />
                </div>
            </td>
            <td class="px-2 py-2">{seller[0]?.fullname}</td>
            <td class="px-2 py-2 capitalize">
                {displayContent}
                {!expanded && product_description?.length > limit && "..."}
                {product_description?.length > limit && (
                    <span
                        style={{ whiteSpace: "nowrap" }}
                        className="text-xs text-[#0773DF] cursor-pointer px-2 py-2"
                        onClick={() => setExpanded((preValue) => !preValue)}
                    >
                        {expanded ? "View Less" : "View More"}
                    </span>
                )}
            </td>
            <td scope="row" class="whitespace-nowrap px-2 py-2  ">{parent_category[0]?.category_name}</td>
            <td class="px-2 py-2">{sub_category[0]?.category_name}</td>
            <td class="px-2 py-2">{child_category[0]?.category_name}</td>
            <td class="px-2 py-2">
                <div class="flex flex-col">
                    <div
                        onClick={() => setReviewModal(true)}
                        class="flex items-center gap-x-2 text-xs cursor-pointer py-1 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        <p className='whitespace-nowrap font-semibold text-gray-900'>Review</p>
                    </div>
                    <div
                        onClick={() => setQuerryModal(true)}
                        class="flex items-center gap-x-2 text-xs cursor-pointer py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                        <p className='whitespace-nowrap font-semibold'>Raise Queries</p>
                    </div>

                    {
                        reviewModal &&
                        <ReviewModal
                            visible={reviewModal}
                            id={_id}
                            onClose={handleClose}
                        />
                    }
                    {
                        querryModal &&
                        <RaiseQueryModal
                            visible={querryModal}
                            id={_id}
                            onClose={handleClose}
                            sellerName={seller[0]?.fullname}
                        />
                    }
                </div>
            </td>
            <td class="px-2 py-2">
                <div className={`px-4 py-1 rounded  text-center capitalize text-white ${review_status === 'reviewed' ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {review_status}
                </div>
            </td>
        </tr>
    )
}

export default TableRow