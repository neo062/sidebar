import React from 'react'

const PdfViewModal = ({ visible, CloseModal, url }) => {
    const handleClose = (e) => {
        if (e.target.id === 'container') {
            CloseModal(e)
        }
    }
    if (!visible) null
    return (
        <div
            id='container'
            onClick={(e) => handleClose(e)}
            className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="w-4/5 flex flex-col mx-auto bg-white rounded ">
                <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
                    width="100%"
                    height="500"
                    title="PDF Viewer"
                ></iframe>
            </div>
        </div>
    )
}

export default PdfViewModal