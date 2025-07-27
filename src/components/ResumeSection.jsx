// src/components/ResumeSection.jsx
'use client';

import { HiChevronDoubleDown } from 'react-icons/hi';

export default function ResumeSection() {
  return (
    <section
      id="resume"
      className="h-screen flex flex-col bg-gray-900 text-white snap-start"
    >
      <h2 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-100">
        Résumé
      </h2>

      {/* Embed takes remaining space minus header/download/scroll */}
      <div className="flex-1 flex justify-center items-center px-4">
        <embed
          src="/resume.pdf"
          type="application/pdf"
          className="w-full max-w-4xl h-full border border-gray-700 rounded shadow-lg"
        />
      </div>

      {/* Download button placed in normal flow below embed */}
      <div className="flex justify-center mt-4">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center px-6 py-2 border border-gray-600 rounded font-bold text-gray-100 hover:bg-gray-700 transition"
        >
          Download Résumé
        </a>
      </div>

      {/* Scroll indicator in normal flow below button */}
      <div className="flex justify-center mt-6 mb-8">
        <HiChevronDoubleDown
          className="text-4xl text-gray-400 animate-bounce cursor-pointer"
          onClick={() =>
            document
              .querySelector('#skills')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        />
      </div>
    </section>
  );
}
