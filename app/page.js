"use client";

// pages/index.jsx

import { useState } from 'react';
import SitemapForm from '../components/SitemapForm';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function HomePage() {
  const [sitemap, setSitemap] = useState([]);

  const handleFormSubmit = (pageData) => {
    setSitemap(prevSitemap => [...prevSitemap, { ...pageData, id: prevSitemap.length }]);
  };

  const pageTitles = sitemap.map(page => page.pageTitle);

  const groupedPages = sitemap.reduce((acc, page) => {
    (acc[page.hierarchyLevel] = acc[page.hierarchyLevel] || []).push(page);
    return acc;
  }, {});

  const exportPDF = () => {
    const input = document.body; // or you can use document.getElementById('yourElementId') to be more specific
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: "portrait",
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
      });
  }

  return (
    <div className="p-4">
      <SitemapForm onSubmit={handleFormSubmit} pageTitles={pageTitles} />
      <div className="mt-8 mb-4  mx-auto w-80">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h3 className="font-bold text-lg text-black">Legend</h3>
          <p className='text-black'><span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Rounded gray</span> = Hierarchy level</p>
          <p className='text-black'><span className="text-blue-500">Blue font</span> = Connected pages</p>
          <button onClick={exportPDF} className="mt-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
            Export as PDF
          </button>
        </div>
      </div>
      <div className="mt-8">
        {Object.entries(groupedPages).map(([level, pages]) => (
          <div key={level} className="space-y-4 bg-gray-700 px-4 py-4">
            <h2 className="text-2xl font-bold">{level}</h2>
            <div className="flex flex-wrap -m-2">
              {pages.map((page) => (
                <div key={page.id} className="p-4 bg-white shadow-lg rounded-lg m-2 flex-1">
                  <h3 className="text-xl font-bold text-black">{page.pageTitle}</h3>
                  <p className='text-black'>{page.pageContent}</p>
                  <div className="mt-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{page.hierarchyLevel}</span>
                    {page.connectedPages.map((title, index) => (
                      <div key={index} className="mt-1 text-sm text-blue-500">{title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}