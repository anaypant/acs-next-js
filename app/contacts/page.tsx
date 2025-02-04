    // Contacts Page
    'use client';

    import React, { useState } from 'react';

    interface Contact {
        id: string;
        name: string;
        email: string;
        phone: string;
        company: string;
    }

    export default function ContactsPage() {
        const [contacts, setContacts] = useState<Contact[]>([
            {
                id: '1',
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '555-1234',
                company: 'Acme Corp',
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'janesmith@example.com',
                phone: '555-5678',
                company: 'Tech Solutions',
            },
        ]);

        return (
            <div className="h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-white font-sans">
                <header className="p-6 bg-gray-800 shadow-md">
                    <h1 className="text-3xl font-bold">Contacts</h1>
                </header>

                <main className="p-6">
                    <section className="bg-gray-700 p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Your Contacts</h2>
                        <ul className="space-y-3">
                            {contacts.map((contact) => (
                                <li key={contact.id} className="bg-gray-800 p-4 rounded-md hover:bg-gray-700 transition">
                                    <h3 className="text-xl font-bold">{contact.name}</h3>
                                    <p className="text-gray-400">Email: {contact.email}</p>
                                    <p className="text-gray-400">Phone: {contact.phone}</p>
                                    <p className="text-gray-400">Company: {contact.company}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <button className="mt-6 px-4 py-2 bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition">
                        Add New Contact
                    </button>
                </main>
            </div>
        );
    }
