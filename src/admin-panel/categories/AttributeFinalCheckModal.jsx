import React, { useState, useEffect } from "react";

const BASE_URL = "https://two1genx.onrender.com";
const AttributeFinalCheckModal = (props) => {
  const { visible, onClose, selectedAttribute, addAttributeId, id } = props;
  const selectedAttributeJSON = JSON.stringify(selectedAttribute); // Convert to JSON
  // State for selected attribute list
  const [attribute, setAttribute] = useState([]);

  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/attributes/get?page=1&limit=500&filter[_id][$in]=${selectedAttributeJSON}`
    )
      .then((res) => res.json())
      .then((data) => {
        setAttribute(data.attributeList);
      });
  }, []);

  // filtering data from attribute list
  let vitalInfo;
  let variantAttributes;
  let moreDetails;
  let offer;
  let compliance;
  let description;
  let keywords;
  attribute &&
    (() => {
      vitalInfo = attribute.filter((currentValue) => {
        if (currentValue.attribute_group_slug === "vital_info") {
          return currentValue;
        }
      });
      variantAttributes = attribute.filter((currentValue) => {
        if (currentValue.attribute_group_slug === "variant_attributes") {
          return currentValue;
        }
      });
      moreDetails = attribute.filter((currentValue) => {
        if (currentValue.attribute_group_slug === "more_details") {
          return currentValue;
        }
      });
      offer = attribute.filter((currentValue) => {
        if (currentValue.attribute_group_slug === "offer") {
          return currentValue;
        }
      });
      compliance = attribute.filter((currentValue) => {
        if (currentValue.attribute_group_slug === "compliance") {
          return currentValue;
        }
      });
      description = attribute.filter((currentValue) => {
        if (currentValue.attribute_group_slug === "description") {
          return currentValue;
        }
      });
      keywords = attribute.filter((currentValue) => {
        if (currentValue.attribute_group_slug === "keywords") {
          return currentValue;
        }
      });
    })();
  const [checkboxValues, setCheckboxValues] = useState([]);
  console.log(checkboxValues)
  const handleCheckboxChange = (attributeId, checkboxIndex, isChecked) => {
    const attributeValues = checkboxValues.find(
      (val) => val.attribute_id === attributeId
    );
    if (attributeValues) {
      if (checkboxIndex === 0) {
        attributeValues.recommended = isChecked;
      } else if (checkboxIndex === 1) {
        attributeValues.required = isChecked;
      }
      setCheckboxValues([...checkboxValues]);
    } else {
      setCheckboxValues([
        ...checkboxValues,
        {
          attribute_id: attributeId,
          category_id: addAttributeId,
          required: checkboxIndex === 1 ? isChecked : false,
          recommended: checkboxIndex === 0 ? isChecked : false,
        },
      ]);
    }
  };
  // required recommanded state from previous
  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/category-attributes/get?page=1&limit=500&filter[category_id][$eq]=${id}&filter[attribute_id][$in]=${selectedAttributeJSON}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.categoryList);
        let selected = data.categoryList.map((item) => {
          return {
            attribute_id: item.attribute_id,
            category_id: id,
            required: item.required,
            recommended: item.recommended,
          };
        });
        setCheckboxValues([...checkboxValues, ...selected]);
        console.log(selected);
      });
  }, []);

  const updateData = (url, requestBody) => {
    fetch(url, requestBody)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          window.location.href = "admin-categories";
          onClose();
        }
      })
      .catch((error) => console.log(error));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = checkboxValues;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    console.log(data);
    updateData(
      `${BASE_URL}/v1/category-attributes/add-many`,
      requestOptions
    );
  };

  console.log(id);

  if (!visible) null;
  return (
    <div className="max-h-screen fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center overflow-y-auto">
      <div className=" w-11/12 mx-auto bg-white rounded m-auto px-10">
        <h3 className="text-2xl text-gray-900 font-bold">Final Check</h3>
        <h2 className="text-xl text-gray-900 font-semibold mt-5">Attribute</h2>
        <form onSubmit={handleSubmit}>
          <div className=" flex justify-between flex-wrap gap-5 py-5">
            <div
              className={`w-1/4 ${vitalInfo.length === 0 ? "hidden" : "block"}`}
            >
              <div className="flex justify-between">
                <h4 className="text-base text-gray-900  font-medium">
                  Vital Info
                </h4>
                <div className="flex">
                  <p className="text-xs text-gray-900 font-medium  uppercase rotate-[270deg] origin-top mb-7">
                    RECOMMENDED
                  </p>
                  <p className="text-xs text-gray-900 font-medium uppercase rotate-[270deg] origin-top mt-4 -ml-[35px] -mr-[10px]">
                    REQUIRED
                  </p>
                </div>
              </div>

              <div className=" flex flex-col py-2">
                {
                  // Render checkboxes and store their values
                  vitalInfo &&
                  vitalInfo.map((attribute, index) => (
                    <div
                      key={attribute._id}
                      className="flex justify-between items-center"
                    >
                      <label
                        htmlFor={`checked-checkbox-${attribute._id}-1`}
                        className="max-w-[180px] mr-2 text-sm font-normal text-gray-900"
                      >
                        <span className="mr-2">{`${index + 1}.`}</span>
                        {attribute.attribute_name}
                      </label>
                      <div>
                        <input
                          id={`checked-checkbox-${attribute._id}-1`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none mr-7"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).recommended
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              0,
                              e.target.checked
                            )
                          }
                        />
                        <input
                          id={`checked-checkbox-${attribute._id}-2`}
                          type="checkbox"
                          required
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).required
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              1,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* // variant_attributes list */}
            <div
              className={`w-1/4 ${variantAttributes.length === 0 ? "hidden" : "block"
                }`}
            >
              <div className="flex justify-between">
                <h4 className="text-base text-gray-900  font-medium">
                  Variant Attributes
                </h4>
                <div className="flex">
                  <p className="text-xs text-gray-900 font-medium  uppercase rotate-[270deg] origin-top mb-7">
                    RECOMMENDED
                  </p>
                  <p className="text-xs text-gray-900 font-medium uppercase rotate-[270deg] origin-top mt-4 -ml-[35px] -mr-[10px]">
                    REQUIRED
                  </p>
                </div>
              </div>

              <div className=" flex flex-col py-2">
                {
                  // Render checkboxes and store their values
                  variantAttributes &&
                  variantAttributes.map((attribute, index) => (
                    <div
                      key={attribute._id}
                      className="flex justify-between items-center"
                    >
                      <label
                        htmlFor={`checked-checkbox-${attribute._id}-1`}
                        className="max-w-[180px] mr-2 text-sm font-normal text-gray-900"
                      >
                        <span className="mr-2">{`${index + 1}.`}</span>
                        {attribute.attribute_name}
                      </label>
                      <div>
                        <input
                          id={`checked-checkbox-${attribute._id}-1`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none mr-7"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).recommended
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              0,
                              e.target.checked
                            )
                          }
                        />
                        <input
                          id={`checked-checkbox-${attribute._id}-2`}
                          type="checkbox"
                          required
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).required
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              1,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* // More details */}
            <div
              className={`w-1/4 ${moreDetails.length === 0 ? "hidden" : "block"
                }`}
            >
              <div className="flex justify-between">
                <h4 className="text-base text-gray-900  font-medium">
                  More Details
                </h4>
                <div className="flex">
                  <p className="text-xs text-gray-900 font-medium  uppercase rotate-[270deg] origin-top mb-7">
                    RECOMMENDED
                  </p>
                  <p className="text-xs text-gray-900 font-medium uppercase rotate-[270deg] origin-top mt-4 -ml-[35px] -mr-[10px]">
                    REQUIRED
                  </p>
                </div>
              </div>

              <div className=" flex flex-col py-2">
                {
                  // Render checkboxes and store their values
                  moreDetails &&
                  moreDetails.map((attribute, index) => (
                    <div
                      key={attribute._id}
                      className="flex justify-between items-center"
                    >
                      <label
                        htmlFor={`checked-checkbox-${attribute._id}-1`}
                        className="max-w-[180px] mr-2 text-sm font-normal text-gray-900"
                      >
                        <span className="mr-2">{`${index + 1}.`}</span>
                        {attribute.attribute_name}
                      </label>
                      <div>
                        <input
                          id={`checked-checkbox-${attribute._id}-1`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none mr-7"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).recommended
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              0,
                              e.target.checked
                            )
                          }
                        />
                        <input
                          id={`checked-checkbox-${attribute._id}-2`}
                          type="checkbox"
                          required
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).required
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              1,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* // Offer */}
            <div className={`w-1/4 ${offer.length === 0 ? "hidden" : "block"}`}>
              <div className="flex justify-between">
                <h4 className="text-base text-gray-900  font-medium">Offer</h4>
              </div>

              <div className=" flex flex-col py-2">
                {
                  // Render checkboxes and store their values
                  offer &&
                  offer.map((attribute, index) => (
                    <div
                      key={attribute._id}
                      className="flex justify-between items-center"
                    >
                      <label
                        htmlFor={`checked-checkbox-${attribute._id}-1`}
                        className="max-w-[180px] mr-2 text-sm font-normal text-gray-900"
                      >
                        <span className="mr-2">{`${index + 1}.`}</span>
                        {attribute.attribute_name}
                      </label>
                      <div>
                        <input
                          id={`checked-checkbox-${attribute._id}-1`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none mr-7"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).recommended
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              0,
                              e.target.checked
                            )
                          }
                        />
                        <input
                          id={`checked-checkbox-${attribute._id}-2`}
                          type="checkbox"
                          required
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).required
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              1,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* compliance */}
            <div
              className={`w-1/4 ${compliance.length === 0 ? "hidden" : "block"
                }`}
            >
              <div className="flex justify-between">
                <h4 className="text-base text-gray-900  font-medium">
                  Compliance
                </h4>
              </div>

              <div className=" flex flex-col py-2">
                {
                  // Render checkboxes and store their values
                  compliance &&
                  compliance.map((attribute, index) => (
                    <div
                      key={attribute._id}
                      className="flex justify-between items-center"
                    >
                      <label
                        htmlFor={`checked-checkbox-${attribute._id}-1`}
                        className="max-w-[180px] mr-2 text-sm font-normal text-gray-900"
                      >
                        <span className="mr-2">{`${index + 1}.`}</span>
                        {attribute.attribute_name}
                      </label>
                      <div>
                        <input
                          id={`checked-checkbox-${attribute._id}-1`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none mr-7"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).recommended
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              0,
                              e.target.checked
                            )
                          }
                        />
                        <input
                          id={`checked-checkbox-${attribute._id}-2`}
                          type="checkbox"
                          required
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-400 focus:outline-none"
                          checked={
                            checkboxValues.find(
                              (val) => val.attribute_id === attribute._id
                            )
                              ? checkboxValues.find(
                                (val) => val.attribute_id === attribute._id
                              ).required
                              : false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              attribute._id,
                              1,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="flex gap-x-5 justify-center my-5">
            <button
              className="py-2 px-10 bg-[#00388c] text-white rounded-lg uppercase"
              type="submit"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttributeFinalCheckModal;
