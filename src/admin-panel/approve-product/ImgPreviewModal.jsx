import React, { useState, useEffect } from 'react'

const ImgPreviewModal = ({ visible, images, onClose }) => {
    console.log(images);

    const handleClose = (e) => {
        if (e.target.id === 'container') {
            onClose()
        }
    }
    const [clickedImg, setIsClickedImg] = useState(0)
    const [img, setImg] = useState('')
    useEffect(() => {
        if (clickedImg === 0) {
            setImg(images?.main_img)
        } else if (clickedImg === 1) {
            setImg(images?.img_1)
        } else if (clickedImg === 2) {
            setImg(images?.img_2)
        } else if (clickedImg === 3) {
            setImg(images?.img_3)
        } else if (clickedImg === 4) {
            setImg(images?.img_4)
        } else if (clickedImg === 5) {
            setImg(images?.img_5)
        } else if (clickedImg === 6) {
            setImg(images?.img_6)
        } else if (clickedImg === 7) {
            setImg(images?.img_7)
        } else if (clickedImg === 8) {
            setImg(images?.img_8)
        }
    }, [clickedImg])
    if (!visible) {
        return null;
    }
    return (
        <div
            id='container'
            onClick={(e) => handleClose(e)}
            className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-4/5 mx-auto flex flex-col bg-white rounded-lg shadow-lg p-4'>
                <div className="flex items-start justify-end px-4 py-1 border-b border-solid border-slate-200 rounded-t">
                    <button className=" float-right text-3xl leading-none font-semibold"
                        type="button"
                        onClick={() => onClose()}>
                        <span className="hover:scale-110 duration-300 bg-transparent text-[#50C4D9]  text-2xl block">
                            x
                        </span>
                    </button>
                </div>
                <div className='flex justify-center '>
                    <div className='border border-solid border-[#DDDDDD] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
                        <img className='w-52 aspect-square ' src={img} alt='product-img' />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-x-5 
                my-5'>
                    {
                        images?.img_1 &&
                        <div
                            onClick={() => setIsClickedImg(1)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 1 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={img} alt='product-img' />
                        </div>
                    }
                    {
                        images?.img_2 &&
                        <div
                            onClick={() => setIsClickedImg(2)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 2 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={images?.img_2} alt='product-img' />
                        </div>
                    }
                    {
                        images?.img_3 &&
                        <div
                            onClick={() => setIsClickedImg(3)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 3 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={images?.img_3} alt='product-img' />
                        </div>
                    }
                    {
                        images?.img_4 &&
                        <div
                            onClick={() => setIsClickedImg(4)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 4 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={images?.img_4} alt='product-img' />
                        </div>
                    }
                    {
                        images?.img_5 &&
                        <div
                            onClick={() => setIsClickedImg(5)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 5 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={images?.img_5} alt='product-img' />
                        </div>
                    }
                    {
                        images?.img_6 &&
                        <div
                            onClick={() => setIsClickedImg(6)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 6 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={images?.img_6} alt='product-img' />
                        </div>
                    }
                    {
                        images?.img_7 &&
                        <div
                            onClick={() => setIsClickedImg(7)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 7 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={images?.img_7} alt='product-img' />
                        </div>
                    }
                    {
                        images?.img_8 &&
                        <div
                            onClick={() => setIsClickedImg(8)}
                            className={`border border-solid  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${clickedImg === 8 ? 'border-2 border-green-500' : 'border-[#DDDDDD]'}`}>
                            <img className='w-20 aspect-square' src={images?.img_8} alt='product-img' />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ImgPreviewModal