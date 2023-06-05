import React, { useState, useEffect } from 'react'

const ViewModal = (props) => {
    const { visible, onClose, id } = props
    const [orderDetails, setOrderDetails] = useState([])
    const [billingDetails, setBillingsDetails] = useState([])
    const [shippingDetails, setShippingDetails] = useState([])
    const [productDetails, setProductDetails] = useState([])
    const [sellerDetails, setSellerDetails] = useState([])
    useEffect(() => {
        try {
            fetch(`https://order-table-vnu0.onrender.com/v1/order/get-order-data/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
                .then(res => res.json())
                .then(data => {
                    setOrderDetails(data.data[0]);
                    setBillingsDetails(data.data[0]?.billing_address[0])
                    setShippingDetails(data.data[0]?.shipping_address[0])
                    setProductDetails(data.data[0]?.order_items[0])
                    setSellerDetails(data.data[0]?.seller_details[0])

                });
        } catch (error) {
            console.log(error);
        }

    }, [])

    if (!visible) null
    return (
        <div className=" fixed inset-0 overflow-x-hidden overflow-y-scroll bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center my-auto" >
            <div className='flex flex-col bg-white rounded py-1 px-10'>
                <div className="flex items-start justify-end px-4 py-1 border-b border-solid border-slate-200 rounded-t">
                    <button className=" float-right text-3xl leading-none font-semibold"
                        type="button"
                        onClick={() => onClose()}>
                        <span className="hover:scale-110 duration-300 bg-transparent text-[#50C4D9]  text-2xl block">
                            x
                        </span>
                    </button>
                </div>
                <div className="max-w-6xl flex flex-wrap justify-around m-auto ">
                    <div className='flex shrink-0 basis-5/12 flex-col py-2 shadow-[0px_1px 6px_rgba(208,208,208,0.61)] '>
                        <div className='bg-[#EAEAF1]'>
                            <h3 className='py-2 px-4  text-[#143250] '>Order Details</h3>
                        </div>

                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Order Id</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{orderDetails?._id}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Total Products</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{orderDetails?.total_product}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Shipping Method</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>Free </div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Pacakagin Method</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>Default Packaging</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Total Cost</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{orderDetails?.amount}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Order Date</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{orderDetails?.createdAt}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Payment Method</p>:</div>
                            <div className='w-1/2 font-normal pl-5'>{orderDetails?.payment_method}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Payment Status</p>:</div>
                            <div className='w-1/2 font-normal pl-5'>{orderDetails?.payment}</div>
                        </div>
                        {/* <button type='button' className='w-fit flex items-center bg-[#2D3274]  text-white rounded-full py-2 px-6 mt-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            View Invoice
                        </button> */}
                    </div>
                    <div className='flex shrink-0 basis-5/12 flex-col py-2 shadow-[0px_1px 6px_rgba(208,208,208,0.61)] '>
                        <div className='bg-[#EAEAF1]'>
                            <h3 className='py-2 px-4  text-[#143250] '>Billing Details</h3>
                        </div>

                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Name</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{billingDetails?.name}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Email</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{billingDetails?.email}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Phone</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{billingDetails?.mobile}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Address</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{billingDetails?.house_address} {billingDetails?.area_address}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Country</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{billingDetails?.country}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>City</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{billingDetails?.city}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Postal Code</p>:</div>
                            <div className='w-1/2 font-normal pl-5'>{billingDetails?.pincode}</div>
                        </div>

                    </div>
                    <div className='flex shrink-0 basis-5/12 flex-col py-2 shadow-[0px_1px 6px_rgba(208,208,208,0.61)] '>
                        <div className='bg-[#EAEAF1]'>
                            <h3 className='py-2 px-4  text-[#143250] '>Shipping Details</h3>
                        </div>

                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Name</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{shippingDetails?.name}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Email</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{shippingDetails?.email}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Phone</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{shippingDetails?.mobile}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Address</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{shippingDetails?.house_address} {shippingDetails?.area_address}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Country</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{shippingDetails?.country}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>City</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{shippingDetails?.city}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Postal Code</p>:</div>
                            <div className='w-1/2 font-normal pl-5'>{shippingDetails?.pincode}</div>
                        </div>

                    </div>
                    <div className='flex shrink-0 basis-5/12 flex-col py-2 shadow-[0px_1px 6px_rgba(208,208,208,0.61)] '>
                        <div className='bg-[#EAEAF1]'>
                            <h3 className='py-2 px-4  text-[#143250] '>Products Ordered</h3>
                        </div>

                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Producr Id#</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{productDetails?._id}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Seller Name</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{sellerDetails?.fullname}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Product Title</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{productDetails?.item_name}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Price</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{orderDetails?.amount}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Quantity</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>{orderDetails?.totatl_product}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Warranty Type</p>:</div>
                            <div className='w-1/2 font-normal pl-5 text-xs'>1 year warranty</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Total Price</p>:</div>
                            <div className='w-1/2 font-normal pl-5'>{orderDetails?.amount}</div>
                        </div>
                        <div className=' flex text-xs  text-gray-900'>
                            <div className='w-1/2 flex justify-between font-bold'><p className='text-xs'>Status</p>:</div>
                            <div className='w-1/2 font-normal pl-5'>{orderDetails?.order_status}</div>
                        </div>

                    </div>

                </div >
            </div>
        </div >
    )
}

export default ViewModal