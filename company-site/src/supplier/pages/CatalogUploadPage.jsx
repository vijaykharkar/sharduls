import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Download } from 'lucide-react';

const CatalogUploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(selectedFile);
      setUploadStatus(null);
    } else {
      alert('Please upload a valid Excel file (.xls or .xlsx)');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setUploadStatus('success');
      setFile(null);
    }, 2000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/vnd.ms-excel' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(droppedFile);
      setUploadStatus(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Catalog Upload</h1>
        <p className="text-gray-600 mt-2">Upload your product catalog in Excel format</p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Upload Instructions</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Download the template Excel file and fill in your product details</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Ensure all required fields are filled correctly</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Upload the completed Excel file using the form below</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>Our team will review and approve your catalog within 24-48 hours</span>
          </li>
        </ul>
      </div>

      {/* Download Template */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Download Template</h3>
              <p className="text-sm text-gray-600">Excel template with sample data</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download className="h-5 w-5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Upload Your Catalog</h3>
        
        {uploadStatus === 'success' && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Upload Successful!</p>
              <p className="text-sm text-green-700">Your catalog has been uploaded and is under review.</p>
            </div>
          </div>
        )}

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition"
        >
          {!file ? (
            <>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Drag and drop your Excel file here
              </h4>
              <p className="text-gray-600 mb-4">or</p>
              <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
                <span>Browse Files</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".xls,.xlsx"
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported format: Excel (.xls, .xlsx) - Max size: 10MB
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <FileSpreadsheet className="h-16 w-16 text-green-600 mx-auto" />
              <div>
                <p className="font-semibold text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Upload Catalog'}
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Previously Uploaded Catalogs */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Upload History</h3>
        <div className="text-center py-8">
          <FileSpreadsheet className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No catalogs uploaded yet</p>
          <p className="text-sm text-gray-400 mt-1">Your upload history will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default CatalogUploadPage;
