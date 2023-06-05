import React, { useState } from "react";
import AttributesModal from "./AttributesModal";

const AttributesRow = ({ srNo, parent, sub, categoriesId, desc, id }) => {
  // State for view modal
  const [viewModal, setViewModal] = useState(false);
  // State for edit
  const [editModal, setEditModal] = useState(false);

  const handleClose = () => {
    setViewModal(false);
    setEditModal(false);
  };
  return (
    <tr className="overflow-hidden border-b-2 rounded-b-3xl  bg-white transition duration-300 ease-in-out">
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        {srNo}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        {parent}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        {sub}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        {categoriesId}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        {desc}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
        <div className="flex gap-2">
          <div onClick={() => setViewModal(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div onClick={() => setEditModal(true)}>
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          {viewModal && (
            <AttributesModal
              id={id}
              modalName="view"
              visible={viewModal}
              onClose={handleClose}
            />
          )}
          {editModal && (
            <AttributesModal
              id={id}
              visible={editModal}
              modalName="edit"
              onClose={handleClose}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default AttributesRow;
