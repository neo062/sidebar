import React, { useState, useEffect } from 'react'
import ImgPreviewModal from './ImgPreviewModal';
const BASE_URL = "https://two1genx.onrender.com";
const ReviewModal = ({ visible, onClose, id }) => {
    const [imgPreviewModal, setImgPreviewModal] = useState(false)
    const [productData, setProductData] = useState({});
    const [productImg, setProductImg] = useState([])
    const brandName = productData?.brand?.[0]?.brand_name ?? "Generic";
    const contryName = productData?.country?.[0]?.country_name ?? 'Null';
    const seo = productData?.category_tags;
    const awards = productData?.awards;
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.log(error);
            throw new Error('An error occurred');
        }
    }

    async function UpdateStatus(id, body) {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            };

            const response = await fetch(`${BASE_URL}/v1/products/edit/${id}`, requestOptions)
            if (response.ok) {
                const data = await response.json();
                onClose()
                console.log(data);

            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // fetching product infomation
        fetchData(`${BASE_URL}/v1/products/get-products-list/id/?filter[_id][$eq]=${id}`)
            .then((data) => {
                setProductData(data.productList[0])
                console.log(data.productList[0]);
            })
            .catch((error) => console.log(error));

        // fetching product img
        fetchData(`${BASE_URL}/v1/product-images/get/product/${id}`).then(data => setProductImg(data.image_list)).catch(error => console.log(error))
    }, [id]);

    const handleVerify = () => {
        console.log(id);
        UpdateStatus(id, { review_status: 'reviewed' })
    }


    const [selectedTab, setSelectedTab] = useState(1)
    const handleClick = (value) => {
        setSelectedTab(value)
        console.log(value);
    }

    const handleClose = () => {
        setImgPreviewModal(false)
    }
    const handleOutSide = (e) => {
        if (e.target.id === 'container') {
            onClose()
        }
    }

    if (!visible) null
    return (
        <div
            onClick={(e) => handleOutSide(e)}
            id='container'
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-11/12 mx-auto flex flex-col bg-white rounded-lg shadow-lg p-4'>
                <div className="flex items-start justify-end px-4 py-1 border-b border-solid border-slate-200 rounded-t">
                    <button className=" float-right text-3xl leading-none font-semibold"
                        type="button"
                        onClick={() => onClose()}>
                        <span className="hover:scale-110 duration-300 bg-transparent text-[#50C4D9]  text-2xl block">
                            x
                        </span>
                    </button>
                </div>
                <div className='flex gap-x-10'>
                    <div
                        onClick={() => setImgPreviewModal(true)}
                        className=''>
                        <img className='w-44 aspect-square'
                            src={productImg?.main_img} alt='product-img' />
                    </div>
                    <div className='flex grow flex-col my-auto'>
                        <div className='flex gap-x-5 py-1'>
                            <h3 className='w-1/5 text-right'>Name:</h3>
                            <p>{productData?.item_name}</p>
                        </div>
                        <div className='flex gap-x-5 py-1'>
                            <h3 className='w-1/5 text-right'>Brand:</h3>
                            <p>{brandName}</p>
                        </div>
                        <div className='flex gap-x-5 py-1'>
                            <h3 className='w-1/5 text-right'>Modal Number:</h3>
                            <p>{productData?.model_number_vital_info
                            }</p>
                        </div>
                        <div className='flex gap-x-5 py-1'>
                            <h3 className='w-1/5 text-right'>Status:</h3>
                            <p>{productData?.status}</p>
                        </div>
                        {
                            productData?.createdAt &&
                            <div className='flex gap-x-5 py-1'>
                                <h3 className='w-1/5 text-right'>Available From:</h3>
                                <p>{productData?.createdAt}</p>
                            </div>
                        }
                        {
                            productData?.updatedAt &&
                            <div className='flex gap-x-5 py-1'>
                                <h3 className='w-1/5 text-right'>Last Update:</h3>
                                <p>{productData?.updatedAt}</p>
                            </div>
                        }
                    </div>
                </div>
                {/* Info section */}
                <div className='flex justify-around my-5 border-b boder-solid border-gray-900'>
                    <div
                        onClick={() => handleClick(1)}
                        className={`text-sm text-gray-600 uppercase py-2 px-9 cursor-pointer rounded ${selectedTab === 1 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#F0F0F0]' : ''}`}>
                        Basic Info
                    </div>
                    <div
                        onClick={() => handleClick(2)}
                        className={`text-sm text-gray-600 uppercase py-2 px-9 cursor-pointer rounded ${selectedTab === 2 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#F0F0F0]' : ''}`}>
                        Description
                    </div>
                    <div
                        onClick={() => handleClick(3)}
                        className={`text-sm text-gray-600 uppercase py-2 px-9 cursor-pointer rounded ${selectedTab === 3 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#F0F0F0]' : ''}`}>
                        Details
                    </div>
                    <div
                        onClick={() => handleClick(4)}
                        className={`text-sm text-gray-600 uppercase py-2 px-9 cursor-pointer rounded ${selectedTab === 4 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#F0F0F0]' : ''}`}>
                        Seo
                    </div>
                    <div
                        onClick={() => handleClick(5)}
                        className={`text-sm text-gray-600 uppercase py-2 px-9 cursor-pointer rounded ${selectedTab === 5 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#F0F0F0]' : ''}`}>
                        Award
                    </div>
                    <div
                        onClick={() => handleClick(6)}
                        className={`text-sm text-gray-600 uppercase py-2 px-9 cursor-pointer rounded ${selectedTab === 6 ? 'shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[#F0F0F0]' : ''}`}>
                        Media
                    </div>
                </div>
                <div className='min-h-20'>
                    {
                        selectedTab === 1 &&
                        <div className='w-1/2 flex grow flex-col'>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Manufacturer:</h3>
                                <p>{productData?.manufacturer_vital_info}</p>
                            </div>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Origin country:</h3>
                                <p>{contryName}</p>
                            </div>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>ITF:</h3>
                                <p>{productData?.item_form_variant_attributes
                                }</p>
                            </div>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>MPN:</h3>
                                <p>{productData?.manufacturer_part_number_vital_info}</p>
                            </div>
                        </div>
                    }
                    {
                        selectedTab === 2 &&
                        <div className='w-1/2 flex grow flex-col'>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Description:</h3>
                                <p>{productData?.product_description}</p>
                                <p>{productData?.bullet_point}</p>
                            </div>
                        </div>
                    }
                    {
                        selectedTab === 3 &&
                        <div className='w-1/2 flex grow flex-col'>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Item Condition:</h3>
                                <p>{productData?.item_condition}</p>
                            </div>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Release Date:</h3>
                                <p>{productData?.release_date_more_details}</p>
                            </div>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Sku:</h3>
                                <p>{productData?.product_sku}</p>
                            </div>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Modal Year:</h3>
                                <p>{productData?.model_year_more_details}</p>
                            </div>
                            <div className='flex gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Style:</h3>
                                <p>{productData?.style_more_details}</p>
                            </div>
                        </div>
                    }
                    {
                        selectedTab === 4 &&
                        <div className='w-1/2 flex grow flex-col'>
                            <div className='flex  gap-x-5 py-1 border-y'>
                                <h3 className='w-1/6 text-[#737373] font-bold text-right'>Tags</h3>
                                <div className='flex gap-x-5 gap-y-2 flex-wrap'>
                                    {Array.isArray(seo) &&
                                        seo.map((tag) => (
                                            <p>{tag}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {
                        selectedTab === 5 &&
                        <div className='w-1/2 flex grow flex-col'>
                            {Array.isArray(awards) &&
                                awards.map((award) => (
                                    <div className='flex gap-x-5 py-1 border-y'>
                                        <h3 className='w-1/6 text-[#737373] font-bold text-right'>{award?.award_name}:</h3>
                                        <p>{award?.award_description}</p>
                                        <div className='w-10 h-10'>
                                            <img className='w-full h-full object-cover' src={award?.image} />
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    }
                </div>
                <div className='flex justify-center gap-x-5 py-5'>
                    <button
                        onClick={handleVerify}
                        className='flex justify-center items-center py-2 px-4 bg-[#28A745] text-white' type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                        Verify
                    </button>
                    <button
                        onClick={() => onClose()}
                        className='flex justify-center items-center py-2 px-4 bg-[#DC3545] text-white' type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                        Decline
                    </button>

                </div>
            </div>
            {
                imgPreviewModal && <ImgPreviewModal
                    visible={imgPreviewModal}
                    images={productImg}
                    onClose={handleClose}
                />
            }
        </div >
    )
}

export default ReviewModal