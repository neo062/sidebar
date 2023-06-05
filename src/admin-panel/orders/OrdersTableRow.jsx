import React, { useState } from 'react'
import ViewModal from './ViewModal'
const OrdersTableRow = ({ data, onDelete }) => {
    const { _id, order_id, order_status, payment_method, payment, voucher, seller_details, amount, order_date } = data

    // state for viewModa 
    const [viewModal, setViewModal] = useState(false)
    const handleClose = () => {
        setViewModal(false)
    }

    const handleDelete = () => {
        try {
            fetch(`https://order-table-vnu0.onrender.com/v1/order/delete/${_id}`, {
                method: 'POST'
            })
                .then(res => {
                    if (res.ok) {
                        onDelete();
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                });
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <tr class="border-b border-solid border-gray-200 bg-white hover:bg-gray-50 text-[#222222]">
            <td scope="row" class="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{order_id}</td>
            <td class="px-2 py-2 capitalize">{order_status}</td>
            <td class="px-2 py-2">{payment_method}</td>
            <td class="px-2 py-2 capitalize">{payment}</td>
            <td scope="row" class="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{voucher && voucher[0]?.coupon_code}</td>
            <td class="px-2 py-2">{seller_details && seller_details[0]?.fullname}</td>
            <td class="px-2 py-2">{amount}</td>
            <td class="px-2 py-2">{order_date}</td>
            <td class="px-2 py-2">
                <div class="flex gap-x-2">
                    <div
                        onClick={() => setViewModal(true)}
                        class="rounded bg-[#E8F0FE] p-2 text-xs font-bold text-[#4285F4] cursor-pointer">View</div>
                    <div
                        onClick={() => handleDelete()}
                        class="rounded bg-[#F7D7DB] p-2 text-xs font-bold text-[#A12321] cursor-pointer">Delete
                    </div>
                    {
                        viewModal && <ViewModal
                            id={_id}
                            visible={viewModal}
                            onClose={handleClose}
                        />
                    }
                </div>
            </td>
        </tr>
    )
}

export default OrdersTableRow