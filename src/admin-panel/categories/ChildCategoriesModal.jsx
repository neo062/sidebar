import React, { useEffect, useState, useRef } from 'react'
import slugify from './Slugify';
const BASE_URL = "https://two1genx.onrender.com";
const ChildCategoriesModal = (props) => {
    const { visible, onClose, id, modalName } = props
    // function for posting data to endpoint
    const updateData = (url, requestBody, parentName, subCategoryName, childCategoryName) => {
        fetch(url, requestBody)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log(data);
                    // Prepare data to be sent to the next page
                    const attributeData = {
                        parentName: parentName,
                        subCategory: subCategoryName,
                        childCategoryName: childCategoryName,
                        id: data.added_entry._id
                    };

                    const queryString = new URLSearchParams(attributeData).toString();

                    // Redirect to the next page with the data in the query string
                    window.location.href = `attribute?${queryString}`;
                }

            })
            .catch(error => console.log(error));
    }

    // State for selected parentlistid
    const [selectedParentId, setSelectedParentId] = useState("");
    // State for selected parentlistid
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("")
    const parentListRef = useRef(null);
    const subCategoryListRef = useRef(null);

    const handleSelect = (e) => {
        if (parentListRef.current) {
            const selectedOption = Array.from(parentListRef.current.options).find(
                (option) => option.value === e.target.value
            );
            if (selectedOption && selectedOption.dataset) {
                setSelectedParentId(selectedOption.dataset.id);
            }
        }
        if (subCategoryListRef.current) {
            const selectedOption = Array.from(subCategoryListRef.current.options).find(
                (option) => option.value === e.target.value
            );
            if (selectedOption && selectedOption.dataset) {
                setSelectedSubCategoryId(selectedOption.dataset.id);
            }
        }
    };


    // State for parentlist data
    const [parentList, SetParentList] = useState([])
    if (modalName !== 'edit') {
        useEffect(() => {
            fetch(`${BASE_URL}/v1/categories/get-populated?filter[category_type][$eq]=parent&limit=500`)
                .then(res => res.json())
                .then(data => {
                    SetParentList(data.categoryList)

                })
        }, [])
    }
    // State for Sub Category list
    const [subCategoryList, setSubCategoryList] = useState([])
    if (modalName !== 'edit') {
        useEffect(() => {
            if (selectedParentId) {
                fetch(`${BASE_URL}/v1/categories/get?filter[parent_category_id][$eq]=${selectedParentId}&filter[category_type][$eq]=sub`)
                    .then(res => res.json())
                    .then(data => {
                        setSubCategoryList(data.categoryList)
                        console.log(data.categoryList)
                    })
            } else {
                setSubCategoryList([]);
            }

        }, [selectedParentId])

    }
    // feting data of child attribute by id for edit
    const [childData, setChildData] = useState([])
    if (modalName === 'edit' || modalName === 'view') {
        useEffect(() => {
            fetch(`${BASE_URL}/v1/categories/get-populated/${id}`)
                .then(res => res.json())
                .then(data => {
                    setChildData(data.category)

                })
        }, [])
    }
    // state for form data
    const [formData, setFormData] = useState({
        parent_category: '',
        sub_category: '',
        child_category: '',
        description: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((preValue) => {
            return { ...preValue, [name]: value }
        })
    }
    // Handling Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add child category to backend
        let slug = slugify(formData.child_category)
        let parentName = formData.parent_category;
        let subCategoryName = formData.sub_category;
        let childCategoryName = formData.child_category;

        const data = modalName === 'edit' ? {
            category_desc: formData.description,
            _id: id,
            category_type: "child"
        } :
            {
                category_name: formData.child_category,
                category_slug: slug,
                category_desc: formData.description,
                parent_category_id: selectedParentId,
                sub_category_id: selectedSubCategoryId,
                category_type: "child"
            }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        if (modalName !== 'edit' && selectedSubCategoryId) {
            updateData(`${BASE_URL}/v1/categories/add`, requestOptions, parentName, subCategoryName, childCategoryName, selectedParentId)
        }
        if (modalName !== 'edit' && selectedParentId && !selectedSubCategoryId) {
            const attributeData = {
                parentName: parentName,
                subCategory: subCategoryName,
                childCategoryName: childCategoryName,
                id: selectedParentId
            };

            const queryString = new URLSearchParams(attributeData).toString();

            // Redirect to the next page with the data in the query string
            window.location.href = `attribute?${queryString}`;
        }

        if (modalName === 'edit') {
            fetch(`${BASE_URL}/v1/categories/edit/${id}`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const attributeData = {
                        parentName: childData?.parent_category_id?.category_name,
                        subCategory: childData?.sub_category_id?.category_name,
                        childCategoryName: childData?.category_name,
                        id: childData?._id,
                        modalName: 'edit'
                    };

                    const queryString = new URLSearchParams(attributeData).toString();

                    // Redirect to the next page with the data in the query string
                    window.location.href = `attribute?${queryString}`;

                })


        }

    }
    console.log('selectedParentId', selectedParentId);
    console.log('selectedSubId', selectedSubCategoryId);
    console.log(id);
    if (!visible) null
    return (
        <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" >
            <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">
                <form
                    onSubmit={setSubCategoryList.length !== 0 && handleSubmit}

                    className="flex flex-col">
                    <div className="flex gap-5">
                        <div className="w-1/2 flex flex-col">
                            <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                                Selected Parent Categories
                            </p>
                            <input
                                onChange={(e) => {
                                    handleSelect(e);
                                    handleChange(e);
                                }}
                                name='parent_category'
                                value={formData.parent_category}
                                placeholder={childData && childData?.parent_category_id?.category_name}
                                disabled={modalName === 'edit' || modalName === 'view'}
                                autoComplete="off"
                                list='parentList'
                                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                                type="text"
                            />
                            <datalist
                                ref={parentListRef}

                                id="parentList"
                                className="bg-white mt-2 absolute z-10">
                                {parentList.map((list) => (
                                    <option
                                        key={list._id}
                                        value={list.category_name}
                                        data-id={list._id}
                                        className="p-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {list.category_name}
                                    </option>
                                ))}
                            </datalist>

                        </div>
                        <div className="w-1/2 flex flex-col">
                            <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                                Select Sub-Categories
                            </p>
                            <input
                                onChange={(e) => {
                                    handleSelect(e);
                                    handleChange(e);
                                }}

                                list='sub-category-list'
                                name='sub_category'
                                value={subCategoryList.length === 0 ? '' : formData.sub_category}
                                placeholder={(subCategoryList.length === 0 && childData && modalName === 'edit') ? childData?.sub_category_id?.category_name : 'Null'}
                                disabled={subCategoryList.length === 0}
                                autoComplete="off"

                                className=" h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                                type="text"
                            />
                            <datalist
                                ref={subCategoryListRef}
                                id="sub-category-list" className="bg-white mt-2 absolute z-10">
                                {
                                    subCategoryList &&
                                    subCategoryList.map((list) => (
                                        <option
                                            key={list._id}
                                            value={list.category_name}
                                            data-id={list._id}
                                            class="p-2 cursor-pointer hover:bg-gray-100">

                                        </option>

                                    ))
                                }
                            </datalist>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <div className="w-1/2 flex flex-col">
                            <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                                Child Category Name
                            </p>
                            <input
                                onChange={handleChange}
                                name='child_category'
                                value={formData.child_category}
                                autoComplete='off'
                                placeholder={childData && childData?.category_name}
                                disabled={subCategoryList.length === 0}
                                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                                type="text"
                            />
                        </div>
                        <div className="w-1/2 flex flex-col">
                            <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                                Child Category Id
                            </p>
                            <input
                                disabled
                                placeholder={formData.child_category ? slugify(formData.child_category) : childData?.category_slug}
                                className=" h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                                type="text"
                            />
                        </div>
                    </div>

                    <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                        Description
                    </p>
                    <textarea
                        onChange={handleChange}
                        name='description'
                        value={formData.description}
                        disabled={modalName === 'edit' ? false : subCategoryList.length === 0}
                        placeholder={childData && childData?.category_desc}
                        className="h-24 my-5 px-4 outline-0 border border-solid border-gray-200 resize-none rounded-md"
                        type="text"
                    />

                    <div className="flex gap-x-5 justify-center my-5">
                        <div
                            onClick={() => onClose()}
                            className="py-2 px-4 bg-white text-red-600 rounded-sm"
                        >
                            Cancel
                        </div>

                        {
                            modalName !== 'view' &&
                            < button
                                className="py-2 px-10 bg-[#00388c] text-white rounded-lg uppercase"
                                type="submit"
                            >
                                Next Step
                            </button>
                        }
                    </div>
                </form>
            </div >
        </div >
    )
}

export default ChildCategoriesModal