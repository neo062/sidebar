import React, { useState, useEffect } from 'react'
import AttributeFinalCheckModal from './AttributeFinalCheckModal'
// getting data from redirect url
const BASE_URL = "https://two1genx.onrender.com";

const AddChildAttribute = () => {
    const [finalCheckModal, setFinalCheckModal] = useState(false)
    // function for closing modal
    const handleClose = () => {
        setFinalCheckModal(false)
    }
    const [attribute, setAttribute] = useState([])
    const [attributeData, setAttributeData] = useState({
        parentName: '',
        subCategory: '',
        childCategory: '',
        id: '',
        modalName: ''
    });
    // Getting data from child modal page
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const data = {
            parentName: queryParams.get('parentName'),
            subCategory: queryParams.get('subCategory'),
            childCategory: queryParams.get('childCategoryName'),
            id: queryParams.get('id'),
            modalName: queryParams.get('modalName')
        };
        setAttributeData(data);
        console.log(data);
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}/v1/attributes/get?page=1&limit=500`)
            .then(res => res.json())
            .then(data => {
                setAttribute(data.attributeList)
                console.log(data.attributeList)
            })
    }, [])
    // vital  checkbox state and storing id
    const [checkboxState, setCheckboxState] = useState([]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCheckboxState([...checkboxState, value]);
        } else {
            setCheckboxState(checkboxState.filter((val) => val !== value));
        }
    };
    useEffect(() => {
        fetch(`${BASE_URL}/v1/category-attributes/get-populated?page=1&limit=500&filter[category_id][$eq]=${attributeData.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.categoryList)
                let selected = data.categoryList.map((item) => item.attribute_id._id)
                setCheckboxState([...checkboxState, ...selected]);

            })
    }, [attributeData.modalName])


    const handleSubmit = (e) => {
        setFinalCheckModal(true)
        e.preventDefault();
    }
    let vitalInfo;
    let variantAttributes;
    let moreDetails;
    let offer;
    let compliance;
    let description;
    let keywords;
    attribute && (() => {
        vitalInfo = attribute.filter((currentValue) => {
            if (currentValue.attribute_group_slug === 'vital_info') {
                return currentValue;
            }
        });
        variantAttributes = attribute.filter((currentValue) => {
            if (currentValue.attribute_group_slug === 'variant_attributes') {
                return currentValue;
            }
        });
        moreDetails = attribute.filter((currentValue) => {
            if (currentValue.attribute_group_slug === 'more_details') {
                return currentValue;
            }
        });
        offer = attribute.filter((currentValue) => {
            if (currentValue.attribute_group_slug === 'offer') {
                return currentValue;
            }
        });
        compliance = attribute.filter((currentValue) => {
            if (currentValue.attribute_group_slug === 'compliance') {
                return currentValue;
            }
        });
        description = attribute.filter((currentValue) => {
            if (currentValue.attribute_group_slug === 'description') {
                return currentValue;
            }
        });
        keywords = attribute.filter((currentValue) => {
            if (currentValue.attribute_group_slug === 'keywords') {
                return currentValue;
            }
        });

    })();

    let selectedAttribute = checkboxState;
    let addAttributeId = attributeData.id;
    console.log(selectedAttribute);
    return (
        <main>
            {
                (finalCheckModal && selectedAttribute && addAttributeId) && <AttributeFinalCheckModal
                    visible={finalCheckModal}
                    onClose={handleClose}
                    selectedAttribute={selectedAttribute && selectedAttribute}
                    id={attributeData.id}
                    addAttributeId={addAttributeId && addAttributeId}
                />
            }
            <div>
                {/* //Top section */}
                <section>
                    <div className='max-w-6xl mx-auto py-2'>
                        <div className='flex flex-col'>
                            <h2 className='text-3xl text-gray-900 font-semibold'>Child Categories</h2>
                            <p className='text-base font-semibold text-[#0057FF] mt-2'>Categories {'>'} ChildCategories</p>
                        </div>
                    </div>
                </section>
                {/* // Selected Categories */}
                <section>
                    <div className='max-w-6xl mx-auto flex gap-x-5 '>
                        <div className='w-1/4 flex flex-col'>
                            <p className='text-base text-gray-900 font-normal uppercase'>Parent Categories</p>
                            <div className=' py-3 px-5  border border-solid border-[#E2E1E5] rounded-md ' >
                                <p className='font-semibold uppercase'>{attributeData.parentName}</p>
                            </div>
                        </div>
                        <div className='w-1/4 flex flex-col'>
                            <p className='text-base text-gray-900 font-normal uppercase'>Sub-Categoriy</p>
                            <div className=' py-3 px-5  border border-solid border-[#E2E1E5] rounded-md ' >
                                <p className='font-semibold uppercase'>{attributeData.subCategory ? attributeData.subCategory : 'Null'}</p>
                            </div>
                        </div>
                        <div className='w-1/4 flex flex-col'>
                            <p className='text-base text-gray-900 font-normal uppercase'>Child Categories</p>
                            <div className=' py-3 px-5  border border-solid border-[#E2E1E5] rounded-md ' >
                                <p className='font-semibold uppercase'>{attributeData.childCategory ? attributeData.childCategory : "Null"}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='max-w-6xl mx-auto mt-10'>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className='border-2 border-solid border-gray-200 p-5 rounded-lg'>
                                <div className=''>
                                    <p className='text-2xl text-[#02044A]'>Vital Info</p>
                                    <div className='flex flex-row flex-wrap gap-x-5 gap-y-2 py-5'>
                                        {
                                            vitalInfo && vitalInfo.map((attribute, index) => (
                                                <div
                                                    key={attribute._id}
                                                    className="w-fit flex  items-center py-2">
                                                    <label for={`checked-checkbox-${index}`} className="mr-2 text-sm font-normal text-gray-900">{attribute.attribute_name}</label>
                                                    <input
                                                        onChange={handleCheckboxChange}
                                                        checked={checkboxState.includes(attribute._id)}
                                                        value={attribute._id}
                                                        id={`checked-checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='felx flex-wrap '>
                                    <p className='text-2xl text-[#02044A]'>Variant Attributes</p>
                                    <div className='flex flex-row flex-wrap gap-x-5 gap-y-2 py-5'>
                                        {
                                            variantAttributes && variantAttributes.map((attribute, index) => (
                                                <div
                                                    key={attribute._id}
                                                    className="w-fit flex  items-center py-2">
                                                    <label for={`checked-checkbox-${index}`} className="mr-2 text-sm font-normal text-gray-900">{attribute.attribute_name}</label>
                                                    <input
                                                        onChange={handleCheckboxChange}
                                                        checked={checkboxState.includes(attribute._id)}
                                                        value={attribute._id}
                                                        id={`checked-checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='felx flex-wrap '>
                                    <p className='text-2xl text-[#02044A]'>More Details</p>
                                    <div className='flex flex-row flex-wrap gap-x-5 gap-y-2 py-5'>
                                        {
                                            moreDetails && moreDetails.map((attribute, index) => (
                                                <div
                                                    key={attribute._id}
                                                    className="w-fit flex  items-center py-2">
                                                    <label for={`checked-checkbox-${index}`} className="mr-2 text-sm font-normal text-gray-900">{attribute.attribute_name}</label>
                                                    <input
                                                        onChange={handleCheckboxChange}
                                                        checked={checkboxState.includes(attribute._id)}
                                                        value={attribute._id}
                                                        id={`checked-checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='felx flex-wrap '>
                                    <p className='text-2xl text-[#02044A]'>Offer</p>
                                    <div className='flex flex-row flex-wrap gap-x-5 gap-y-2 py-5'>
                                        {
                                            offer && offer.map((attribute, index) => (
                                                <div
                                                    key={attribute._id}
                                                    className="w-fit flex  items-center py-2">
                                                    <label for={`checked-checkbox-${index}`} className="mr-2 text-sm font-normal text-gray-900">{attribute.attribute_name}</label>
                                                    <input
                                                        onChange={handleCheckboxChange}
                                                        checked={checkboxState.includes(attribute._id)}
                                                        value={attribute._id}
                                                        id={`checked-checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='felx flex-wrap '>
                                    <p className='text-2xl text-[#02044A]'>Complience</p>
                                    <div className='flex flex-row flex-wrap gap-x-5 gap-y-2 py-5'>
                                        {
                                            compliance && compliance.map((attribute, index) => (
                                                <div
                                                    key={attribute._id}
                                                    className="w-fit flex  items-center py-2">
                                                    <label for={`checked-checkbox-${index}`} className="mr-2 text-sm font-normal text-gray-900">{attribute.attribute_name}</label>
                                                    <input
                                                        onChange={handleCheckboxChange}
                                                        checked={checkboxState.includes(attribute._id)}
                                                        value={attribute._id}
                                                        id={`checked-checkbox-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>



                            </div>
                            <div className='flex gap-4 justify-end py-2'>
                                <a href='/' className='py-2 px-24 bg-[#00388C] text-white rounded-xl'>Go Back</a>
                                <button type='submit' className='py-2 px-24 bg-[#00388C] text-white rounded-xl'>Finish</button>
                            </div>

                        </form>
                    </div>
                </section>
            </div >
        </main >
    )
}

export default AddChildAttribute