// Billing Page
'use client';

import React from 'react';

export default function BillingPage() {
    return (
        <div className="h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-white font-sans">
            <header className="p-6 bg-gray-800 shadow-md">
                <h1 className="text-3xl font-bold">Billing</h1>
            </header>

            <main className="p-6">
                <section className="bg-gray-700 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Payment Methods</h2>
                    <ul className="space-y-3">
                        <li className="bg-gray-800 p-3 rounded-md">Credit Card ending in 1234</li>
                        <li className="bg-gray-800 p-3 rounded-md">PayPal - johndoe@example.com</li>
                    </ul>
                    <button className="mt-4 px-4 py-2 bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition">Add Payment Method</button>
                </section>

                <section className="bg-gray-700 p-4 rounded-lg shadow-lg mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Billing History</h2>
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-800">
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Description</th>
                            <th className="p-2 text-left">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="hover:bg-gray-600">
                            <td className="p-2">01/15/2025</td>
                            <td className="p-2">Subscription Fee</td>
                            <td className="p-2">$29.99</td>
                        </tr>
                        <tr className="hover:bg-gray-600">
                            <td className="p-2">12/15/2024</td>
                            <td className="p-2">Subscription Fee</td>
                            <td className="p-2">$29.99</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
