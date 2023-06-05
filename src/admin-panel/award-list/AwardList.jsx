import React, { useState, useEffect } from "react";
import AwardListModal from "./AwardListModal";
import AwardListRow from "./AwardListRow";

const AwardList = () => {
  // state for modal
  const [childModal, setChildModal] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  // For Closing Modal
  const handleClose = () => {
    setChildModal(false);
  };
  let [childCategories, setChildCategories] = useState([]);
  useEffect(() => {
    
    fetch(
      `https://award-country-state.onrender.com/v1/award/all-awards`
    )
      .then((res) => res.json())
      .then((data) => {
        setChildCategories(data.data);
        setData(data.data);
        console.log(data.categoryList);
      });
  }, [AwardListModal]);

  return (
    <div className="px-20 py-10 text-xs font-semibold">
      {childModal && (
        <AwardListModal visible={childModal} onClose={handleClose} />
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
          <p className="text-4xl">Award List</p>
        </div>

      </div>
      <div className="flex items-center justify-end mt-5">
        <div onClick={() => setChildModal(true)} className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p>Add New</p>
        </div>
      </div>

      <section>
        <div className="max-w-6xl mx-auto overflow-hidden rounded-t-3xl my-5">
          <table className="table min-w-full border  border-solid">
            <thead className="bg-[#00388C]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-white"
                >
                  Award Name
                </th>

                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-white"
                >
                 Logo
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-white"
                >
                  Products Listed
                </th>

                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-white"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-normal text-white"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {childCategories.map((categories, index) => (
                <AwardListRow
                  id={categories._id}
                  key={categories._id}
                  parent={categories.award_name}
                  sub={categories.image}
                  // categoriesId={categories.category_slug}
                  desc={categories.award_description}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {childModal && (
        <AwardListModal visible={childModal} onClose={handleClose} />
      )}
    </div>
  );
};

export default AwardList;
