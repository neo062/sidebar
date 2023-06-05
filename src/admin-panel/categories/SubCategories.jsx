import React, { useState, useEffect } from "react";
import SubCategoriesRow from "./SubCategoriesRow";
import SubCategoriesModal from "./SubModal";
const BASE_URL = "https://two1genx.onrender.com";
const SubCategories = () => {
  // state for modal
  const [childModal, setChildModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  // For Closing Modal
  const handleClose = () => {
    setChildModal(false);
  };
  let [childCategories, setChildCategories] = useState([]);
  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/categories/get-populated?filter[category_type][$eq]=sub&limit=100&sort=-createdAt`
    )
      .then((res) => res.json())
      .then((data) => {
        setChildCategories(data.categoryList);
        setData(data.categoryList);
        console.log(data.categoryList);
      });
  }, []);




  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  childCategories = data.filter(item =>
    item.parent_category_id?.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItem = childCategories.length > 0 ? childCategories[0] : null;

  return (
    <div className="px-20 py-10 text-xs font-semibold">
      {childModal && (
        <SubCategoriesModal visible={childModal} onClose={handleClose} />
      )}
      <div>
        <div className="flex items-center py-3">
          <a href="/admin-panel/admin-categories">
            {" "}
            <svg
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
            </svg>
          </a>
          <p className="text-2xl">Sub Categories</p>
        </div>
        <div className="flex px-4 text-[#0056fe] text-xs">
          Categories &gt; Sub Categories
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-x-5">
          <div className="flex">
            {/* // Search 1 */}
            <form className="flex items-center">
              <label className="mr-2">Parent Categories</label>
              <div className="flex items-center p-1 gap-x-1 rounded-lg border border-solid border-[#9D9D9D]">
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  className="py-1 px-1 outline-0"
                  value={searchTerm}
                  onChange={handleSearch}
                  type="text"
                />
                {currentItem && <p>{currentItem.name}</p>}
                {/* <ul>
                  {filteredData.map((item) => (
                    <li key={item._id}>{item.category_name}</li>
                  ))}
                </ul> */}
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-col">
            <div onClick={() => setChildModal(true)} className="flex items-center">
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
              <p className="text-xs">Add New Sub Category</p>
            </div>
            <div className="flex gap-x-1">
              <a href="/admin-panel/admin-parent" className="text-left text-xs text-teal-500 py-1 ">Parent-Category</a>
              <a href="/admin-panel/child-categories" className="text-left text-xs text-teal-500 py-1 ">Child-Category</a>
            </div>
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
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Sl no.
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Sub Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Parent Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Category ID
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-normal text-gray-900"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {childCategories &&
                childCategories.map((categories, index) => (
                  <SubCategoriesRow
                    id={categories._id}
                    key={categories._id}
                    srNo={index + 1}
                    parent={categories.category_name}
                    sub={categories.parent_category_id.category_name}
                    categoriesId={categories.category_slug}
                    desc={categories.category_desc}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </section>
      {childModal && (
        <SubCategoriesModal visible={childModal} onClose={handleClose} />
      )}
    </div>
  );
};

export default SubCategories;
