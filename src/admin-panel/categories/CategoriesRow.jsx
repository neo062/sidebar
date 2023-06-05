import React from 'react'

const CategoriesRow = ({ data, index }) => {
    const { parent_category_id, sub_category_id, category_name, status } = data

    return (
        <tr className="overflow-hidden border-b-2 rounded-b-3xl  bg-white transition duration-300 ease-in-out">
            <td className="whitespace-nowrap px-4 py-2 text-xs font-normal text-gray-900">{index + 1}</td>
            <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">{parent_category_id?.category_name}</td>
            <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">{sub_category_id?.category_name}</td>
            <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">{category_name}</td>
            <td className="whitespace-nowrap px-4 py-2 text-xs font-light text-gray-900">
                <div className="flex justify-evenly  items-center">
                    <p>{status}</p>
                    <div className="h-4 w-4 flex justify-center items-center rounded-full bg-green-500 text-white">&#10003;</div>
                </div>
            </td>
        </tr>
    )
}

export default CategoriesRow