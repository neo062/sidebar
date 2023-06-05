import React, { useEffect, useState, useRef } from "react";
import slugify from "./Slugify";
const BASE_URL = "https://two1genx.onrender.com";
const SubCategoriesModal = ({ visible, onClose, id, modalName }) => {
  const [categoriesName, setCategoriesName] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const dataListRef = useRef(null);

  const handleSelect = (event) => {
    const selectedOption = Array.from(dataListRef.current.options).find(
      (option) => option.value === event.target.value
    );
    setSelectedOptionId(selectedOption.dataset.id);
  };

  const updateData = (url, requestOptions) => {
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data) {
          onClose()
          console.log(data)
        }
      })
      .catch(error => console.log(error));
  }

  const [parentList, SetParentList] = useState([]);
  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/categories/get-populated?filter[category_type][$eq]=parent&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        SetParentList(data.categoryList);
        console.log(data);
      });
  }, []);

  const [formData, SetFormData] = useState({
    parentName: "",
    subName: "",
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
    let slug = slugify(formData.subName)

    const data = modalName === 'edit' ? {
      category_desc: formData.description,
      category_type: "sub"
    }
      :
      {
        category_name: formData.subName,
        category_slug: slug,
        category_desc: formData.description,
        category_type: "sub",
        parent_category_id: selectedOptionId
      }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    if (modalName === 'edit') {
      updateData(`${BASE_URL}/v1/categories/edit/${id}`, requestOptions)
    }
    else {
      updateData(`${BASE_URL}/v1/categories/add?filter[category_type][$eq]=sub`, requestOptions)
    }
    SetFormData({
      subName: "",
      description: ""
    })

    onClose()
  }


  const [view, setView] = useState([])
  {
    (modalName === 'view' || modalName === 'edit') &&
      useEffect(() => {
        fetch(`${BASE_URL}/v1/categories/get-populated/${id}`)
          .then(res => res.json())
          .then(data => {
            setView(data.category)
            console.log(data.category)
          })
      }, [])
  }



  if (!visible) null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">
        <form className="flex flex-col"
          onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Selected Parent Categories
              </p>
              <input
                list="parentList"
                name="parentName"
                autoComplete="off"
                placeholder={view && view.parent_category_id?.category_name}
                disabled={modalName === 'view' || modalName === 'edit'}
                onChange={(e) => {
                  handleSelect(e);
                  handleChange(e);
                }}
                value={formData.parentName}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
              <datalist id="parentList" ref={dataListRef} class="bg-white mt-2 absolute z-10">
                {parentList.map((list) => (
                  <option
                    data-id={list._id}
                    key={list._id}
                    value={list.category_name}
                    class="p-2 cursor-pointer hover:bg-gray-100"
                  ></option>
                ))}
              </datalist>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Sub Category Name
              </p>
              <input
                name="subName"
                placeholder={view && view.category_name}
                onChange={handleChange}
                disabled={modalName === 'view' || modalName === 'edit'}
                value={formData.subName}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Sub Category Id
              </p>
              <input
                placeholder={(formData.subName && slugify(formData.subName) || view && view.category_slug)}
                disabled
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
            value={formData.description}
            name="description"
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

export default SubCategoriesModal;
