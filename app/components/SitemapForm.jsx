"use client";

// components/SitemapForm.jsx

import { useState } from 'react';

export default function SitemapForm({ onSubmit, pageTitles }) {
    const [pageTitle, setPageTitle] = useState('');
    const [pageContent, setPageContent] = useState('');
    const [hierarchyLevel, setHierarchyLevel] = useState('Top');
    const [connectedPages, setConnectedPages] = useState([]);

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        setConnectedPages(prev =>
            isChecked
                ? [...prev, value]
                : prev.filter(page => page !== value)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            pageTitle,
            pageContent,
            hierarchyLevel,
            connectedPages,
        });
        // Reset form after submission
        setPageTitle('');
        setPageContent('');
        setHierarchyLevel('Top');
        setConnectedPages([]);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="pageTitle" className="block">Page Title:</label>
                <input
                    id="pageTitle"
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black py-2 px-3"
                    required
                />
            </div>
            <div>
                <label htmlFor="pageContent" className="block">Page Content:</label>
                <textarea
                    id="pageContent"
                    value={pageContent}
                    onChange={(e) => setPageContent(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black py-2 px-3"
                    rows="3"
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="hierarchyLevel" className="block">Hierarchy Level:</label>
                <select
                    id="hierarchyLevel"
                    value={hierarchyLevel}
                    onChange={(e) => setHierarchyLevel(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black py-2 px-3"
                >
                    <option>Top</option>
                    <option>Middle Content</option>
                    <option>Base Level</option>
                </select>
            </div>
            <div>
                <label className="block mb-2 text-md font-medium text-white">Connects To:</label>
                <div className="bg-white border border-gray-300 rounded-md p-4">
                    {pageTitles.map((title, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                id={`connect-${index}`}
                                type="checkbox"
                                value={title}
                                onChange={handleCheckboxChange}
                                checked={connectedPages.includes(title)}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
                            />
                            <label htmlFor={`connect-${index}`} className="ml-2 text-sm text-gray-900">
                                {title}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                Submit
            </button>
        </form>
    );
}