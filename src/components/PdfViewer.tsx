"use client";

const PdfViewer = () => (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-gray-100 to-indigo-50 py-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-indigo-100 p-0 md:p-8">
            <div className="border-b px-6 py-4 bg-indigo-50 rounded-t-2xl flex items-center gap-3">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m9 2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7l5 5v10z" />
                </svg>
                <h2 className="text-2xl font-bold text-indigo-900">Compliance Documentation</h2>
            </div>
            <div className="p-4 md:p-8" style={{ height: '70vh' }}>
                <iframe
                    src="/compliance.pdf"
                    width="100%"
                    height="100%"
                    style={{ border: "none", borderRadius: "12px" }}
                    title="Compliance PDF"
                />
            </div>
        </div>
    </div>
);

export default PdfViewer;