import React, { useState } from "react";

const CouponsTableRow = (props) => {
  const {
    code,
    type,
    amount,
    discount_type,
    used,
    id,
    description,
    isActive,
    handleEdit,
  } = props;
  // changin value based on coupon is actived or not
  const coupon_statuses = ["Activated", "De-activated"];
  let reversed_statuses = [...coupon_statuses];
  if (!isActive) {
    reversed_statuses.reverse();
  }
  const [expanded, setExpanded] = useState(false);
  const limit = 60;
  const slicedContent = description.slice(0, limit);
  const displayContent = expanded ? description : slicedContent;

  const handleDelete = () => {
    const url = `https://coupon-table.onrender.com/v1/coupon/delete/${id}`; // Replace with your API endpoint

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers required by your API
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        if (response.ok) {
          handleEdit(id, "delete");
        }
        // Request successful, handle the response as needed
        console.log("Delete request successful");
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error.message);
      });

    console.log(id);
  };

  const [selectedStatus, setSelectedStatus] = useState("");
  const handleChange = (event, id) => {
    setSelectedStatus(event.target.value);
    if (event.target.value === "Activated") {
      (async () => {
        try {
          const response = await fetch(
            `https://coupon-table.onrender.com/v1/coupon/activate-coupon/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isActive: true }),
            }
          );
          if (response.ok) {
            handleEdit(id, "status");
          }
          const data = await response.json();
          console.log("Data:", data);
        } catch (error) {
          console.log("Error:", error);
        }
      })();
    } else if (event.target.value === "De-activated") {
      (async () => {
        try {
          const response = await fetch(
            `https://coupon-table.onrender.com/v1/coupon/activate-coupon/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ isActive: false }),
            }
          );

          const data = await response.json();
          console.log("Data:", data);
        } catch (error) {
          console.log("Error:", error);
        }
      })();
    }
  };

  return (
    <tr class="border-b border-solid border-gray-200 hover:bg-gray-50  text-[#222222]">
      <td
        scope="row"
        class="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        {code}
      </td>
      <td class="px-4 py-2 text-xs">{type}</td>
      <td class="px-4 py-2 text-xs">
        <p>
          {displayContent}
          {!expanded && description.length > limit && "..."}
          {description.length > limit && (
            <span
              style={{ whiteSpace: "nowrap" }}
              className="text-xs text-[#0773DF] cursor-pointer px-2 py-2"
              onClick={() => setExpanded((preValue) => !preValue)}
            >
              {expanded ? "View Less" : "View More"}
            </span>
          )}
        </p>
      </td>
      <td class="px-4 py-2 text-xs text-center">{`${discount_type === "amount" ? "$" + amount : amount + "%"
        }`}</td>
      <td class="px-4 py-2 text-xs">{used}</td>
      <td
        scope="row"
        class="whitespace-nowrap px-4 py-2 text-xs font-medium text-gray-900"
      >
        <div className="flex justify-center">
          <select
            value={selectedStatus}
            onChange={(e) => handleChange(e, id)}
            class={`w-20 ${isActive ? "bg-green-700" : "bg-red-700"
              } rounded-full p-1 text-[10px]  outline-0 text-white`}
          >
            {reversed_statuses.map((status, index) => (
              <option value={status} className="px-2 py-3" key={index}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td class="px-4 py-2 text-xs">
        <div class="flex gap-x-4">
          <div
            onClick={() => handleEdit(id, "edit")}
            class="flex items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit
          </div>
          <div
            onClick={() => handleDelete()}
            class="flex items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CouponsTableRow;
