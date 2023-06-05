import React, { useEffect, useState } from 'react'
const BASE_URL = "https://two1genx.onrender.com";
const CouponForm = (props) => {
    const { handleClose, id } = props
    console.log(id);
    useEffect(() => {
        if (id) {
            try {
                fetch(`${BASE_URL}/v1/coupon/get-category-populated/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setFormData({
                            coupon_code: data.data.coupon_code,
                            product_type: data.data.category_type,
                            category: data.data.category,
                            discount_type: data.data.discount_type,
                            discount: data.data.discount,
                            quantity_type: data.data.quantity_type,
                            quantity: data.data.quantity,
                            start_date: data.data.start_date,
                            end_date: data.data.end_date,
                            description: data.data.description
                        });
                        console.log(data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } catch (error) {
                console.log('An error occurred:', error);
            }

        }
    }, [id])
    async function AddCoupon(url) {
        try {
            const requestBody = {
                coupon_code: formData.coupon_code,
                category_type: formData.product_type,
                category: formData.category,
                discount_type: formData.discount_type,
                discount: formData.discount,
                quantity_type: formData.quantity_type,
                quantity: formData.quantity,
                start_date: formData.start_date,
                end_date: formData.end_date,
                description: formData.description
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers you need
                },
                body: JSON.stringify(requestBody),
            };

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    // Initialize state for form fields
    const [formData, setFormData] = useState({
        coupon_code: '',
        product_type: '',
        category: '',
        discount_type: '',
        discount: '',
        quantity_type: '',
        quantity: '',
        start_date: '',
        end_date: '',
        description: ''
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            AddCoupon(`${BASE_URL}/v1/coupon/update-coupon/${id}`)
        } else {
            AddCoupon('${BASE_URL}/v1/coupon/add');
        }
        console.log(formData);
        setFormData({
            coupon_code: '',
            product_type: '',
            category: '',
            discount_type: '',
            discount: '',
            quantity_type: '',
            quantity: '',
            start_date: '',
            end_date: '',
            description: ''
        })
    }
    // geting select category list
    const [categoryList, setCategoryList] = useState([])
    async function fetchData(category) {
        try {
            const response = await fetch(`https://categories-ki5e.onrender.com/v1/categories/get-category?filter[category_type][$eq]=${category}&limit=500`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCategoryList(data.categoryList);
            console.log('Data:', data.categoryList);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        if (formData.product_type === 'parent') {
            fetchData('parent')
        } else if (formData.product_type === 'sub') {
            fetchData('sub')
        } else if (formData.product_type === 'child') {
            fetchData('child')
        }
    }, [formData.product_type])
    console.log(categoryList);
    return (
        <div className='pr-6 py-5'>
            <form
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col'>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Code *</label>
                        <input
                            required

                            className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="text"
                            name='coupon_code'
                            value={formData.coupon_code}
                            onChange={handleChange}

                        />
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Allow Product Type *</label>

                        <select
                            required
                            name='product_type'
                            value={formData.product_type}
                            onChange={handleChange}
                            className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                        >
                            <option value="">--Select--</option>
                            <option value="parent">Parent</option>
                            <option value="sub">Sub</option>
                            <option value="child">Child </option>
                            <option value="whole_webside">Whole webside </option>
                        </select>
                    </div>
                    {
                        formData.product_type === 'whole_webside' ? null :
                            <div className=' w-5/6 flex items-center gap-4 my-2'>
                                <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>{`${formData.product_type ? formData.product_type + '*' : 'Categoty *'}`}</label>
                                <select
                                    // required
                                    name='category'
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                                >
                                    <option value="">--Select--</option>
                                    {
                                        categoryList.length !== 0 &&
                                        categoryList.map(item => (
                                            <option key={item._id} value={item.category_slug}>{item.category_name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                    }

                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Type *</label>
                        <select
                            required
                            name='discount_type'
                            value={formData.discount_type}
                            onChange={handleChange}
                            className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                        >
                            <option value="">--Select--</option>
                            <option value="amount">By Amount</option>
                            <option value="percentage">By Percentage</option>
                        </select>
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>


                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>{`${formData.discount_type === 'percentage' ? 'Percentage *' : 'Amount *'}`} </label>

                        <input
                            required
                            className='py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="text"
                            name='discount'
                            value={formData.discount}
                            onChange={handleChange}

                        />
                        {`${formData.discount_type === 'percentage' ? '%' : ''}`}
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Quantity *</label>
                        <select
                            required
                            name='quantity_type'
                            value={formData.quantity_type}
                            onChange={handleChange}
                            className="grow py-1 px-3 border border-solid border-gray-200 rounded-md"
                        >
                            <option value="">--Select--</option>
                            <option value="limited">Limited</option>
                            <option value="unlimited">Unlimited</option>
                        </select>
                    </div>
                    {/* // dynamic field */}
                    {
                        formData.quantity_type === 'limited' &&
                        <div className=' w-5/6 flex items-center gap-4 my-2'>
                            <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '></label>
                            <input
                                required
                                className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                                type="text"
                                name='quantity'
                                value={formData.quantity}
                                onChange={handleChange}

                            />

                        </div>
                    }
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Start Date *</label>
                        <input
                            required
                            className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="date"
                            name='start_date'
                            value={formData.start_date}
                            onChange={handleChange}

                        />
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>End Date *</label>
                        <input
                            required
                            className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            type="date"
                            name='end_date'
                            value={formData.end_date}
                            onChange={handleChange}

                        />
                    </div>
                    <div className=' w-5/6 flex items-center gap-4 my-2'>
                        <label className=' w-1/3 flex justify-end text-xs text-indigo-900 font-bold '>Description *</label>
                        <textarea className='grow py-1 px-3 border border-solid border-gray-200 rounded-md'
                            required
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        >

                        </textarea>
                    </div>

                </div>
                <div className='flex gap-x-4 justify-center items-center py-5'>
                    <button
                        onClick={() => handleClose()}
                        type='button' className='py-1 px-6 text-red-600 '>Cancel</button>
                    <button type='Submit' className='py-1 px-14 bg-blue-900 text-white' >Save</button>
                </div>
            </form>
        </div>
    )
}

export default CouponForm