import React, { useEffect, useState, useRef } from "react";
import slugify from "./Slugify";
const BASE_URL = "https://two1genx.onrender.com";
const AttributesModal = ({ visible, onClose, id, modalName }) => {
  // const [categoriesName, setCategoriesName] = useState("");
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

  function removeDuplicates(arr) {
    return arr.filter((item,
      index) => arr.indexOf(item) === index);
  }


  const [parentList, SetParentList] = useState([]);
  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/attribute-groups/get?page=1&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        SetParentList(data.attributeList);
        console.log(data.attributeList);
      });
  }, []);


  const [formData, SetFormData] = useState({
    subGroup: "",
    attributeName: "",
    description: "",
    attribute_group_name: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    SetFormData((preValue) => {
      return { ...preValue, [name]: value }
    })
  }

  const groupName = (string) => {
    return string
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s_' "]+/g, '_') // Replace spaces, underscores, and apostrophes with hyphens
        .replace(/[^\w-]+/g, '') // Remove all non-word characters except hyphens
        .replace(/--+/g, '_'); // Replace multiple hyphens with a single hyphen
}

  const handleSubmit = (e) => {
    e.preventDefault()
    let slug = slugify(formData.attributeName)
    let atslug = groupName(formData.attribute_group_name)

    const data = modalName === 'edit' ? {
      attribute_desc: formData.description
    }
      :
      {
        attribute_slug: slug,
        attribute_name: formData.attributeName,
        attribute_group_name: formData.attribute_group_name,
        attribute_group_slug: atslug,
        attribute_desc: formData.description
      }
    console.log(data)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    if (modalName === 'edit') {
      updateData(`${BASE_URL}/v1/attributes/edit/${id}`, requestOptions)
    }
    else {
      updateData(`${BASE_URL}/v1/attributes/add`, requestOptions)
    }
    SetFormData({
      attributeName: "",
      description: ""
    })

    onClose()
  }


  const [view, setView] = useState([])
  {
    (modalName === 'view' || modalName === 'edit') &&
      useEffect(() => {
        fetch(`https://categories-ki5e.onrender.com/v1/attributes/get-attribute/${id}`)
          .then(res => res.json())
          .then(data => {
            setView(data.attribute)
            console.log(data)
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
                Select Sub-Group
              </p>
              <input
                autocomplete="off"
                list="parentList"
                name="attribute_group_name"
                placeholder={view && view.attribute_group_name}
                disabled={modalName === 'view' || modalName === 'edit'}
                onChange={(e) => {
                  handleSelect(e);
                  handleChange(e);
                }}
                value={formData.group_name}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
              <datalist id="parentList" ref={dataListRef} class="bg-white mt-2 absolute z-10">
                {parentList.map((list) => (
                  <option
                    data-id={list._id}
                    key={list._id}
                    value={list.group_name}
                    class="p-2 cursor-pointer hover:bg-gray-100"
                  ></option>
                ))}
              </datalist>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase">
                Attribute Name
              </p>
              <input
                name="attributeName"
                placeholder={view && view.attribute_name}
                onChange={handleChange}
                disabled={modalName === 'view' || modalName === 'edit'}
                value={formData.attributeName}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Attribute Id
              </p>
              <input
                placeholder={(formData.attributeName && slugify(formData.attributeName) || view && view.attribute_slug)}
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
            placeholder={view && view.attribute_desc}
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

export default AttributesModal;
