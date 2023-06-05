import React, { useEffect, useState } from "react";

const CountryListModal = ({ visible, onClose, id, modalName }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile(reader.result);
      setFileInputState(e.target.value);
    };
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
    country_name: "",
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
      country_name: formData.country_name,

      image: selectedFile,
    };
    console.log(data);
    modalName === "edit"
      ? {
          country_name: formData.country_name, 
          image: selectedFile,
        }
      : {
          country_name: formData.country_name,
          image: selectedFile,
        };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    if (modalName === "edit") {
      updateData(
        `https://award-country-state.onrender.com/v1/country/update/${id}`,
        requestOptions
      );
    } else {
      updateData(
        "https://award-country-state.onrender.com/v1/country/add",
        requestOptions
      );
    }
    SetFormData({
      country_name: "",
      image: "",
    });
  };
  const [view, setView] = useState([]);
  {
    (modalName === "view" || modalName === "edit") &&
      useEffect(() => {
        fetch(
          `https://award-country-state.onrender.com/v1/country/single-country/${id}`
        )
          .then((res) => res.json())
          .then((data) => {
            setView(data.result);
            SetFormData({
              country_name: data.result.country_name,
              image: "",
            });
            console.log(data.data);
          });
      }, []);
  }
  if (!visible) null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className=" mx-auto bg-white rounded py-5 px-10">
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex gap-5">
            <div className="w-1/2">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
                Country Name
              </p>
              <textarea
                onChange={(e) => handleChange(e)}
                name="country_name"
                value={formData.country_name}
                placeholder={view && view.country_name}
                disabled={modalName === "view"}
                className="h-10 w-full
             my-5 px-4 outline-0 border border-solid border-gray-200 resize-none rounded-md"
                type="text"
              />
            </div>
            <div className="">
              <p className="w-fit text-sm text-gray-900  py-1 uppercase ">
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

export default CountryListModal;
