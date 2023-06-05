import React, { useEffect, useState } from "react";

const AwardListModal = ({ visible, onClose, id, modalName }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile(reader.result);
      setFileInputState(e.target.value);
    }
  };

  const updateData = (url, requestBody) => {
    fetch(url, requestBody)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          onClose();
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  const [formData, SetFormData] = useState({
    award_name: "",
    award_description: "",
    country: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((preValue) => {
      return { ...preValue, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      award_name: formData.award_name,
      award_description: formData.award_description,
      country: formData.country,
      image: selectedFile,
    };
    console.log(data);
    modalName === "edit"
      ? {
        award_name: formData.award_name,
        award_description: formData.award_description,
        country: formData.country,
        image: selectedFile,
      }
      : {
        award_name: formData.award_name,
        award_description: formData.award_description,
        country: formData.country,
        image: selectedFile,
      };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    if (modalName === "edit") {
      updateData(
        `https://award-country-state.onrender.com/v1/award/update/${id}`,
        requestOptions
      );
    } else {
      updateData(
        "https://award-country-state.onrender.com/v1/award/add",
        requestOptions
      );
    }
    SetFormData({
      award_name: "",
      award_description: "",
      country: "",
      image: "",
    });
  };
  const [view, setView] = useState([]);
  {
    (modalName === "view" || modalName === "edit") &&
      useEffect(() => {
        fetch(
          `https://award-country-state.onrender.com/v1/award/single-award/${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            setView(data.result);
            SetFormData({
              award_name: data.result.award_name,
              award_description: data.result.award_description,
              country: data.result.country,
              image: "",
            });
            console.log(data.data);
          });
      }, []);
  }
  if (!visible) null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/2 mx-auto bg-white rounded py-5 px-10">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex gap-5">
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-xs text-gray-900  py-1 uppercase">
                Award name
              </p>
              <input
                autoComplete="off"
                onChange={handleChange}
                name="award_name"
                disabled={modalName === "view" || modalName === "edit"}
                value={formData.award_name}
                placeholder={view && view.award_name}
                className="h-10 my-5 px-4 outline-0 border border-solid border-gray-200 rounded-md"
                type="text"
              />
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="w-fit text-xs text-gray-900  py-1 uppercase ">
                Logo
              </p>
              <div>
                <input
                  onChange={handleFileInputChange}
                  disabled={modalName === "view"}
                  type="file"
                  className="border mt-6 p-1"
                />
              </div>
            </div>
          </div>

          <p className="w-fit text-xs text-gray-900  py-1 uppercase ">
            Country Name
          </p>
          <textarea
            onChange={(e) => handleChange(e)}
            name="country"
            value={formData.country}
            placeholder={view && view.country}
            disabled={modalName === "view"}
            className="h-10 w-1/2
             my-5 px-4 outline-0 border border-solid border-gray-200 resize-none rounded-md"
            type="text"
          />

          <p className="w-fit text-xs text-gray-900  py-1 uppercase ">
            Description
          </p>
          <textarea
            onChange={(e) => handleChange(e)}
            name="award_description"
            value={formData.award_description}
            placeholder={view && view.award_description}
            disabled={modalName === "view"}
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
            {modalName === "view" ? null : (
              <button
                className="py-2 px-10 bg-[#00388c] text-white rounded-lg uppercase"
                type="submit"
              >
                add new
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AwardListModal;
