import React, { useEffect, useState } from 'react'
import PdfViewModal from './PdfViewModal'
const AttachmentModal = ({ onClose, visible, id }) => {
    const [pdfModal, setPdfModal] = useState(false)
    const [attachMent, SetAttachMent] = useState([])

    async function fetchAttachment() {
        try {
            const response = await fetch(`https://sellerverification.onrender.com/v1/verifySeller/viewAttachments/${id}`)

            const data = await response.json();
            SetAttachMent(data[0])
            console.log(data[0]);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchAttachment()
    }, [])

    async function makePutRequest(id) {
        try {
            const url = 'https://sellerverification.onrender.com/v1/verifySeller/isVerify';

            const payload = {
                // Add your desired request body here
                id: id,
                status: true
            };

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };

            const response = await fetch(url, requestOptions);

            if (response.ok) {
                const responseData = await response.json();
                onClose('verify')
                console.log('PUT request successful:', responseData);
            } else {
                throw new Error('PUT request failed');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }


    const handleVerify = () => {
        makePutRequest(id);
    }
    const handleClosePdf = (e) => {
        console.log('hii');
        if (e.target.id === 'container') {
            setPdfModal(false)
        }
    }
    console.log(pdfModal);
    if (!visible) null
    return (
        <div
            id='container'
            onClick={handleClosePdf}
            className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="w-1/2 flex flex-col mx-auto bg-white rounded ">
                <div className='flex justify-between items-center p-5 border border-solid border-gray-300'>
                    <h1 className='text-base font-semibold text-[#143250]'>Attachments</h1>
                    <div
                        onClick={() => onClose('close')}
                        className='cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                <div className='flex flex-col p-5'>
                    <div className='flex justify-between'>
                        <div className='w-2/5 flex justify-between '>
                            <div className='w-1/2 flex justify-between'>
                                <h1 className=' text-base  font-semibold text-[#143250]'>Vendor Name
                                </h1>
                                :
                            </div>
                            <p className='text-sm text-right  font-normal mx-1'>
                                {attachMent?.fullname}
                            </p>
                        </div>
                        <div className='w-2/5 flex justify-between '>
                            <div className='w-1/2 flex justify-between'>
                                <h1 className=' text-base  font-semibold text-[#143250]'>Email
                                </h1>
                                :
                            </div>
                            <p className='text-sm text-right  font-normal mx-1'>
                                {attachMent?.email}
                            </p>
                        </div>
                    </div>
                    {/* 2 row */}
                    <div className='flex justify-between'>
                        <div className='w-2/5 flex justify-between '>
                            <div className='w-1/2 flex justify-between'>
                                <h1 className=' text-base  font-semibold text-[#143250]'>Store Name
                                </h1>
                                :
                            </div>
                            <p className='text-sm text-right  font-normal mx-1'>
                                {attachMent?.store_name}
                            </p>
                        </div>
                        <div className='w-2/5 flex justify-between '>
                            <div className='w-1/2 flex justify-between'>
                                <h1 className=' text-base  font-semibold text-[#143250]'>Gst
                                </h1>
                                :
                            </div>
                            <p className='text-sm text-right  font-normal mx-1'>
                                {attachMent?.gst_number}
                            </p>
                        </div>
                    </div>
                    {/* 3 row  */}
                    <div className='flex justify-between'>
                        <div className='w-2/5 flex justify-between '>
                            <div className='w-1/2 flex justify-between'>
                                <h1 className=' text-base  font-semibold text-[#143250]'>Pan
                                </h1>
                                :
                            </div>
                            <p className='text-sm text-right  font-normal mx-1'>
                                {attachMent?.pan_number}
                            </p>
                        </div>
                        <div className='w-2/5 flex justify-between '>
                            <div className='w-1/2 flex justify-between'>
                                <h1 className=' text-base  font-semibold text-[#143250]'>Seller Type
                                </h1>
                                :
                            </div>
                            <p className='text-sm text-right  font-normal mx-1'>
                                {attachMent?.sellerType}
                            </p>
                        </div>
                    </div>
                </div>
                {/* // preview section */}
                <div className='flex justify-around'>
                    <div
                        onClick={() => setPdfModal(true)}
                        className=' w-2/5 flex justify-center items-center h-40 bg-gray-200 rounded'>
                        <div className='w-10 h-10' >
                            <img className='w-full h-full object-cover' src='https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x32.png' />
                        </div>
                        {(pdfModal && attachMent.gstImageUrl) &&
                            <PdfViewModal
                                CloseModal={handleClosePdf}
                                visible={pdfModal}
                                url={attachMent.gstImageUrl}
                            />
                        }
                    </div>
                    <div
                        onClick={() => setPdfModal(true)}
                        className=' w-2/5 flex justify-center items-center h-40 bg-gray-200 rounded'>
                        <div className='w-10 h-10' >
                            <img className='w-full h-full object-cover' src='https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_3_pdf_x32.png' />
                        </div>
                        {(pdfModal && attachMent.panImageUrl) &&
                            <PdfViewModal
                                visible={pdfModal}
                                CloseModal={handleClosePdf}
                                url={attachMent.panImageUrl}
                            />
                        }
                    </div>
                </div>
                <div className='flex justify-center gap-x-5 py-5'>
                    <button
                        onClick={(e) => handleVerify(e)}
                        className='flex justify-center items-center py-2 px-4 bg-[#28A745] text-white' type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Verify
                    </button>
                    <button
                        onClick={() => onClose('close')}
                        className='flex justify-center items-center py-2 px-4 bg-[#DC3545] text-white' type='button'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                        Decline
                    </button>

                </div>
            </div>
        </div>
    )
}

export default AttachmentModal