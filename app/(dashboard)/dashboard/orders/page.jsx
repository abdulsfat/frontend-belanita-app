"use client";

import TitleCard from "../components/cards/title-card";
import DummyData from "../helper/dummy-data";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


const OrderAdmin = () => {
    const [bills, setBills] = useState(DummyData.BILLS);

    const getPaymentStatus = (status) => {
        if (status === "Paid") return <div className="badge badge-primary">{status}</div>;
        if (status === "Pending") return <div className="badge badge-secondary">{status}</div>;
        if (status === "Shipped") return <div className="badge badge-accent">{status}</div>;
        if (status === "Completed") return <div className="badge badge-success">{status}</div>;
        return <div className="badge badge-ghost">{status}</div>;
    };

    const columns = [
        { label: 'Order Number', key: 'order_number' },
        { label: 'Quantity', key: 'quantity' },
        { label: 'Total Price', key: 'total_price' },
        { label: 'Status', key: 'status' },
        { label: 'User', key: 'user_id' },
        { label: 'Actions', key: 'actions' },
    ];

    const data = [
        {
            order_number: 'ORD-0001',
            quantity: '1',
            total_price: '50000',
            status: 'Pending',
            user_id: 'Dea'
        },
        {
            order_number: 'ORD_0002',
            quantity: '2',
            total_price: '100000',
            status: 'Pending',
            user_id: 'Dea'
        },
    ];

    const submenuIconClasses = 'h-5 w-5 mr-2';

    return (
        <>
            <TitleCard title="List of Orders" topMargin="mt-2">
                <div className="w-full overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>User</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill, index) => (
                                <tr key={index}>
                                    <td>{bill.invoiceNo}</td>
                                    <td>{bill.generatedOn}</td>
                                    <td>{bill.description}</td>
                                    <td>{bill.paidOn}</td>
                                    <td>${bill.amount}</td>
                                    <td>{getPaymentStatus(bill.status)}</td>
                                    <td>
                                        <div>
                                            <button>
                                                    <PencilSquareIcon
                                                        className={
                                                            submenuIconClasses
                                                        }
                                                    />
                                                </button>
                                                <button>
                                                    <TrashIcon
                                                        className={
                                                            submenuIconClasses
                                                        }
                                                    />
                                                </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
};

export default OrderAdmin;
