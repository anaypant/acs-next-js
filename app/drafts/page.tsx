// Drafts Page
'use client';

import React, { useState } from 'react';

interface Draft {
    id: string;
    title: string;
    content: string;
    lastEdited: string;
}

export default function DraftsPage() {
    const [drafts, setDrafts] = useState<Draft[]>([
        {
            id: '1',
            title: 'Proposal for AI Integration',
            content: 'Draft content goes here...',
            lastEdited: '01/22/2025',
        },
        {
            id: '2',
            title: 'Marketing Plan for Q2',
            content: 'Draft content goes here...',
            lastEdited: '01/20/2025',
        },
    ]);

    return (
        <div className="h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-gray-800 text-white font-sans">
            <header className="p-6 bg-gray-800 shadow-md">
                <h1 className="text-3xl font-bold">Drafts</h1>
            </header>

            <main className="p-6">
                <section className="bg-gray-700 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Your Drafts</h2>
                    <ul className="space-y-3">
                        {drafts.map((draft) => (
                            <li key={draft.id} className="bg-gray-800 p-4 rounded-md hover:bg-gray-700 transition">
                                <h3 className="text-xl font-bold">{draft.title}</h3>
                                <p className="text-gray-400 text-sm">Last edited: {draft.lastEdited}</p>
                                <p className="text-gray-400 mt-2 line-clamp-2">{draft.content}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <button className="mt-6 px-4 py-2 bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition">
                    Create New Draft
                </button>
            </main>
        </div>
    );
}
