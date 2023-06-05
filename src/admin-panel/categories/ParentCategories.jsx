import React, { useState, useEffect } from "react";
import CategoriesRow from "./ParentCategoriesRow";
import { ParentModal } from "./ParentModal";
import getParentList from "./FetchApi";
const BASE_URL = "https://two1genx.onrender.com";

const ParentCategories = () => {
  // State for parent categories list
  const [parentCategories, setParentCategories] = useState([])
  const [parentModal, setParentModal] = useState(false)
  // getting parent list data 
  async function fetchData() {
    const url = `${BASE_URL}/v1/categories/get?filter[category_type][$eq]=parent&limit=500`;
    const parentCategories = await getParentList(url);
    setParentCategories(parentCategories);
    console.log(parentCategories);
  }
  useEffect(() => {
    fetchData()
  }, [parentModal])
  // For Closing Modal
  const handleClose = () => {
    setParentModal(false)

  }
  return (
    <div className="px-20 py-10 text-sm font-semibold">
      <div>
        <div className="flex items-center py-3">
          <a href="/admin-panel/admin-categories"> <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg></a>
          <p className="text-2xl">Parent Categories</p>
        </div>
        <div className="flex text-xs px-6 text-[#0056fe]">
          Categories &gt; Parent Categories
        </div>
      </div>
      <div className="flex justify-end ">
        <div className="flex flex-col">
          <div
            onClick={() => setParentModal(true)}
            className="flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs">Add New Parent Category</p>
          </div>
          <div className="flex gap-x-1">
            <a href="/admin-panel/admin-subCategories" className="text-left text-xs text-teal-500 py-1 ">Sub-Category</a>
            <a href="/admin-panel/child-categories" className="text-left text-xs text-teal-500 py-1 ">Child-Category</a>
          </div>
        </div>
      </div>
      <section>
        <div className="max-w-5xl mx-auto overflow-hidden rounded-t-xl my-5">
          <table className="table min-w-full border  border-solid">
            <thead className="bg-[#e5f2f4]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Sl no.
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Parent Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Category ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                parentCategories &&
                parentCategories.map((categories, index) => (
                  <CategoriesRow
                    key={categories._id}
                    id={categories._id}
                    srNo={index + 1}
                    parentName={categories.category_name}
                    categoriesId={categories.category_slug}
                    description={categories.category_desc}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </section>
      {parentModal && <ParentModal

        visible={parentModal}
        onClose={handleClose} />}
    </div>
  )
}
export default ParentCategories;