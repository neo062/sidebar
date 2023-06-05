import React from 'react'

const RaiseQueryModal = ({ visible, id, onClose, sellerName }) => {
    const handleClose = (event) => {
        if (event.target.id === 'container') {
            onClose()
        }
    }
    const reasons = [
        'Reason 1',
        'Reason 2',
        'Reason 3',
        // Add more reasons here
    ];
    console.log(id);
    if (!visible) null
    return (
        <div
            id='container'
            onClick={handleClose}
            className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" >
            <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">

                <form className="flex flex-col">
                    <div className="flex gap-5">
                        <div className="w-1/2 flex flex-col">
                            <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                                Seller Details
                            </p>
                            <div className="flex items-center h-10 my-5 px-4 py-2 text-xs outline-0 border border-solid border-gray-200 rounded-md"
                            >{id}-{sellerName}</div>
                        </div>
                        <div className="w-1/2 flex flex-col">
                            <label htmlFor="reason" className="w-fit text-sm text-gray-900  py-1 uppercase">
                                Select a reason
                            </label>
                            <select
                                id="reason"
                                name="reason"
                                className="h-10 my-5 px-4 py-2 text-xs outline-0 border border-solid border-gray-200 rounded-md"
                            >
                                {reasons.map((reason, index) => (
                                    <option key={index} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <label id='description' className="w-fit text-sm text-gray-900  py-1 uppercase ">
                        Description
                    </label>
                    <textarea
                        style={{ resize: 'vertical' }}
                        id='description'
                        name="description"
                        className="my-5 px-4 outline-none border border-solid border-gray-200 resize-none rounded-md"
                        type="text"
                        rows='5'
                    ></textarea>

                    <div className="flex gap-x-5 justify-center my-5">
                        <button
                            className="py-2 px-14 bg-[#00388c] text-white rounded-md uppercase"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RaiseQueryModal