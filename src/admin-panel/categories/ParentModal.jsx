import React, { useEffect, useState } from "react";
import slugify from "./Slugify";
const BASE_URL = "https://two1genx.onrender.com";
export const ParentModal = ({ visible, onClose, id, modalName }) => {

  const updateParent = async (url, requestBody) => {
    try {
      const response = await fetch(url, requestBody);
      const data = await response.json();
      if (response.ok) {
        onClose();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [formData, SetFormData] = useState({
    parentName: "",
    description: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    SetFormData((preValue) => {
      return { ...preValue, [name]: value }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let slug = slugify(formData.parentName)
    const data = modalName === 'edit' ? {
      category_desc: formData.description,
      category_type: "parent"
    }
      :
      {
        category_name: formData.parentName,
        category_slug: slug,
        category_desc: formData.description,
        category_type: "parent"
      }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    if (modalName === 'edit') {
      updateParent(`${BASE_URL}/v1/categories/edit/${id}`, requestOptions)
    }
    else {
      updateParent(`${BASE_URL}/v1/categories/add?filter[category_type][$eq]=parent`, requestOptions)
    }
    SetFormData({
      parentName: "",
      description: ""
    })
  }
  const [view, setView] = useState([])
  {
    (modalName === 'view' || modalName === 'edit') &&
      useEffect(() => {
        fetch(`${BASE_URL}/v1/categories/get/${id}`)
          .then(res => res.json())
          .then(data => {
            setView(data.category)
            console.log(data.category)
          })
      }, [])
  }
  if (!visible) null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" >
      <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col">
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                parent category name
              </p>
              <input
                onChange={handleChange}
                name="parentName"
                disabled={modalName === 'view' || modalName === 'edit'}
                value={formData.parentName}
                placeholder={view && view.category_name}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                category id
              </p>
              <input
                disabled
                placeholder={(formData.parentName && slugify(formData.parentName) || view && view.category_slug)}
                className=" h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
          </div>
          <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
            Description
          </p>
          <textarea
            onChange={(e) => handleChange(e)}
            name="description"
            value={formData.description}
            placeholder={view && view.category_desc}
            disabled={modalName === 'view'}
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
              modalName === 'view' ? null : <button
                className="py-2 px-10 bg-[#00388c] text-white rounded-lg uppercase"
                type="submit"
              >
                add new
              </button>
            }

          </div>
        </form>
      </div>
    </div>
  );
};
